import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthAttemptsService from "App/Services/AuthAttemptsService";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterValidator from "App/Validators/RegisterValidator";
import Hash from "@ioc:Adonis/Core/Hash";
import Profile from "App/Models/Profile";

export default class UsersController {
  public async registerShow({ inertia }: HttpContextContract) {
    return inertia.render("Auth/Register");
  }

  public async register({auth,session,request,response,}: HttpContextContract) {
    const data = await request.validate(RegisterValidator);
    const user = await User.create({ ...data, roleId: 1 });

    const profile = new Profile();
    await profile
      .merge({
        userId: user.id,
      })
      .save();
    await auth.login(user);
    session.flash("success", "You are register in it. Good navigation!");
    return response.redirect(`/profile/edit/${profile.id + 1}`);
  }

  public async loginShow({ inertia }: HttpContextContract) {
    return inertia.render("Auth/Login");
  }

  public async login({ auth, request, response, session, }: HttpContextContract) {
    const { uid, password } = await request.validate(LoginValidator);

    const loginAttemptRemaining = await AuthAttemptsService.getRemainingAttempts(uid);
    if (loginAttemptRemaining <= 0) {
      session.flash(
        "error",
        "Your account has been locked due to repeated bad login attempts. Please reset your password."
      );
      return response.redirect("/");
    }

    try {
      const user = await User.query().where("email", uid).firstOrFail();

      if (!(await Hash.verify(user.password, password))) {
        return response.redirect(`/auth/bad-password/${user.id}`)
      }

      await auth.login(user);
      await AuthAttemptsService.deleteBadAttempts(uid);
    } catch (error) {
      await AuthAttemptsService.recordLoginAttempt(uid);
      session.flash("errors", {
        form: "The provided email or password is incorrect",
      });
      return response.redirect().back();
    }

    session.flash("success", `Welcome back, ${auth.user!.username}!`);
    return response.redirect("/");
  }

  public async logout({ auth, session, response }: HttpContextContract) {
    await auth.logout();

    session.flash("success", "You have been logged out");

    return response.redirect().toRoute("home");
  }

  public async forgotPasswordShow({ inertia }: HttpContextContract) {
    return inertia.render("Auth/ForgotPassword");
  }

  public async forgotPassword({ request, response }: HttpContextContract) {
    const user = await User.findBy("email", request.input("email"));

    return response.redirect(`/auth/login/new-password/${user?.username}`);
  }

  public async badPassword({ inertia, params }: HttpContextContract) {
    const user = await User.findBy("id", params.id);
    return inertia.render("Auth/BadPassword", { user });
  }

  public async reenterPassword({ auth, session, request, response,params }: HttpContextContract) {
    const user = await User.query().where("id", params.id).firstOrFail();
    try {
      
      const password = request.input("password");
      if (!(await Hash.verify(user.password, password))) {
        return response.redirect(`/auth/bad-password/${user.id}`);
      }

      await auth.login(user);
      await AuthAttemptsService.deleteBadAttempts(user.email);
    } catch (error) {
      await AuthAttemptsService.recordLoginAttempt(user.email);
      session.flash("errors", {
        form: "The provided email or password is incorrect",
      });
      return response.redirect().back();
    }

    return response.redirect(`/`);
  }

  public async newPasswordShow({ inertia, params }: HttpContextContract) {
    const user = await User.query()
      .where("username", params.username)
      .firstOrFail();
    return inertia.render("Auth/NewPassword", { user });
  }

  public async newPassword({ session, request, response, auth, params, }: HttpContextContract) {
    const user = await User.findBy("username", params.username);

    const password = request.input("password");

    await user?.merge({ password: password }).save();

    await auth.login(user!);

    session.flash("success", `Welcome back, ${auth.user!.username}!`);
    return response.redirect("/");
  }
}
