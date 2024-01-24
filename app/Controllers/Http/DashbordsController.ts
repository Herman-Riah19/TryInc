import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Categorie from 'App/Models/Categorie'
import AssetService from 'App/Services/AssetService'
import CategorieValidator from 'App/Validators/CategorieValidator'
import Profile from 'App/Models/Profile'

export default class DashbordsController {
  async showDashbord({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect("/auth/login");
    }
    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");

    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl("./Categories");

    return inertia.render("Dashbord/Dashbord", {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
      auth,
    });
  }

  public async statisticOfActivity({
    inertia,
    auth,
    response,
  }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }
    const products = await Product.all();

    return inertia.render("Dashbord/Statistic", {
      products,
      auth,
    });
  }

  public async collections({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }
    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");

    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl("./Categories");

    return inertia.render("Dashbord/DashbordCollection", {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
      auth,
    });
  }

  public createCategorie({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }
    return inertia.render("Dashbord/CategorieForm");
  }

  public async saveCategorie({ request, response, session, }: HttpContextContract) {
    const categorie = new Categorie();

    categorie.asset = await AssetService.uploadFile(
      request,
      "./Categories/",
      "asset"
    );

    const data = await request.validate(CategorieValidator);
    await categorie.merge({ ...data }).save();
    session.flash("success", "Your Categorie is saved");
    return response.redirect("/dashbord");
  }

  public async deleteCategorie({ response, params }: HttpContextContract) {
    try {
      const categorie = await Categorie.findOrFail(params.id);
      await categorie?.delete();
      return response.redirect("/dashbord/collections");
    } catch (error) {
      console.error('There are an error: ', error)
      return response.redirect("/dashbord/collections");

    }
  }

  public async editProduct({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }
    return inertia.render("Dashbord/EditProduct", { auth });
  }

  public async deleteProduct({ params, response }: HttpContextContract) {
    const product = await Product.findBy("id", params.id);

    try {
      await product?.delete();
      return response.redirect().toRoute("dashbord.collections");
    } catch (error) {
      console.error('There are an error when the product deleted', error)
      return response.redirect().toRoute("dashbord.collections");
    }
  }

  public async getAllUsers({ inertia, auth, response }: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }
    const usersList = await User.all()
    const allUserProfiles = await Profile.all()

    const userUrl = await Drive.getUrl("./avatar");
    return inertia.render("Dashbord/UsersList", { auth, usersList, allUserProfiles, userUrl });
  }

  public async deleteUserById({auth, params, response}: HttpContextContract) {
    if (auth.user?.roleId != 2) {
      return response.redirect().toRoute("user.login");
    }

    try{
      const userToDeleted = await User.findBy('id', params.id)
      const profileOfUserToDeleted = await Profile.findBy('user_id', userToDeleted?.id)
      await profileOfUserToDeleted?.delete()
      await userToDeleted?.delete()
      return response.redirect().toRoute("dashbord.user");
    } catch(error) {
      console.error('There are an error when delete user: ', error)
      return response.redirect().toRoute("dashbord.user");

    }
    
  }
}
