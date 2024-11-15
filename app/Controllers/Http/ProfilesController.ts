import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import Collection from "App/Models/Collection";
import User from "App/Models/User";
import Drive from "@ioc:Adonis/Core/Drive";
import ProfileValidator from "App/Validators/ProfileValidator";
import Profile from "App/Models/Profile";
import { ProfileService } from "App/Services/ProfileService";
import AssetService from "App/Services/AssetService";
import Like from "App/Models/Like";
import Following from "App/Models/Following";

export default class ProfilesController {
  public async showProfile({ inertia, params, auth }: HttpContextContract) {
    const username = await params.username.split("_").join(" ");
    const user = await User.findBy("username", username);
    const profile = await Profile.findBy("user_id", user?.id);

    const following = await Following.findBy("following_id", user?.id);
    let isFollowed = following?.followerId == auth.user?.id;

    const products = await Product.query().where('user_id', user!.id).orderBy("created_at", "desc");

    const likes = Array<Like>();
    products.map(async (prod) => {
      const allLike = await Like.query().where("product_id", prod.id);

      allLike.map(jaime => {
        likes.push(jaime)
      })
    })


    const productUrl = await Drive.getUrl("./products");
    const profileBannerUrl = await Drive.getUrl(`./banner`);

    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);

    const collections = await Collection.query().where('user_id', user!.id);;

    const collectionUrl = await Drive.getUrl("./collections");

    return inertia.render("User/Profile", {
      user,
      profile,
      auth,
      authenticateProfile,
      products,
      productUrl,
      likes,
      avatarUrl,
      profileBannerUrl,
      collections,
      collectionUrl,
      isFollowed,
    });
  }

  public async showEditProfile({ inertia, params, auth }: HttpContextContract) {
    const user = await User.findBy("id", params.id);

    const profile = await Profile.findBy("user_id", user?.id);
    const profileAvatarUrl = await Drive.getUrl(`./avatar`);
    const profileBannerUrl = await Drive.getUrl(`./banner`);
    return inertia.render("User/EditUser", {
      user,
      profile,
      profileAvatarUrl,
      profileBannerUrl,
      auth,
    });
  }

  public async edit({ request, response, session, auth }: HttpContextContract) {
    const profile = await Profile.findBy("user_id", auth.user?.id);

    profile!.avatar = await AssetService.uploadProfileFile(
      request,
      auth.user?.username,
      "avatar"
    );
    profile!.banner = await AssetService.uploadProfileFile(
      request,
      auth.user?.username,
      "banner"
    );

    const data = await request.validate(ProfileValidator);
    await profile!.merge({ ...data }).save();

    session.flash("success", "Your profile is enter");
    return response.redirect(
      `/profile/${auth.user?.username.split(" ").join("_")}`
    );
  }

  public async hasBeenFollowed({ params, response, auth, session }: HttpContextContract) {
    try {
      if (!auth.isLoggedIn) {
        return response.redirect().toRoute("user.login");
      }

      const followingUser = await Profile.findBy("user_id", params.id);
      const followerUser = await User.findBy("id", auth.user?.id);

      const profileUser = await User.findBy("id", params.id);
      const username = profileUser?.username.split(" ").join("_");

      const hasFolloweds = await Following.query().where(
        "following_id",
        followingUser!.id
      );
      if (hasFolloweds.length > 0) {
        for await (const hasFollowed of hasFolloweds) {
          if (hasFollowed?.followerId == followerUser?.id) {
            const isFollowed = (hasFollowed!.isFollowed =
              !hasFollowed?.isFollowed);
            await hasFollowed?.save();

            let numberFollow = followingUser!.numberFollower;
            followingUser!.numberFollower = isFollowed
              ? numberFollow! + 1
              : numberFollow! - 1;
            await followingUser?.save();

            session.flash("Success", "User has been followed!");
            break;
          } else {
            continue;
          }
        }
        return response.redirect(`/profile/${username}`);
      } else {
        const isFollowed = new Following();
        await isFollowed
          .merge({
            followingId: followingUser?.id,
            followerId: followerUser?.id,
            isFollowed: true,
          })
          .save();
        followingUser!.numberFollower += 1;
        await followingUser?.save();
        session.flash("Success", "User has been followed!");
        return response.redirect(`/profile/${username}`);
      }
    } catch (error) {
      session.flash("Error", "There are a Error in the context: " + error);
      return response.redirect().back();
    }
  }

  public async destroy({ }: HttpContextContract) { }
}
