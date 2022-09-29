import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Post from "App/Models/Post";
import Product from "App/Models/Product";
import User from "App/Models/User";
import Profile from "App/Models/Profile";

export default class HomeController {
  async home({ inertia, auth }: HttpContextContract) {
    const posts = await Post.all();
    const products = await Product.all();
    const users = await User.all();
    const postUrl = await Drive.getUrl("./post");
    const productUrl = await Drive.getUrl("./collections");

    let avatar = null
    const avatarUrl = await Drive.getUrl("./avatar");
    if (auth.isAuthenticated) {
      const profile = await Profile.findBy("user_id", auth.user?.id);
      avatar = profile?.avatar;
    }

    const existProfiles = await Profile.all()

    return inertia.render("Home/Home", {
      users,
      posts,
      postUrl,
      products,
      productUrl,
      auth,
      avatar,
      avatarUrl,
      existProfiles
    });
  }
}
