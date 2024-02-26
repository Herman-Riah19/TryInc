import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Post from "App/Models/Post";
import Product from "App/Models/Product";
import User from "App/Models/User";
import Profile from "App/Models/Profile";
import { ProfileService } from "App/Services/ProfileService";
import Categorie from "../../Models/Categorie";
import Like from "App/Models/Like";

export default class HomeController {
  public async home({ inertia, auth }: HttpContextContract) {
    const posts = await Post.all();
    const postUrl = await Drive.getUrl("./post");

    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");

    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl("./Categories");

    const { avatarUrl, authenticateProfile } =
      await ProfileService.getAthenticateProfile(auth);

    const existProfiles = await Profile.all();

    const bannerUrl = await Drive.getUrl("./banner");

    const likes = await Like.all();

    return inertia.render("Home/Home", {
      users,
      auth,
      authenticateProfile,
      avatarUrl,
      bannerUrl,
      existProfiles,
      posts,
      postUrl,
      products,
      productUrl,
      categories,
      categorieUrl,
      likes,
    });
  }

  public async collection({ inertia, auth }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } =
      await ProfileService.getAthenticateProfile(auth);
    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl("./Categories");

    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");

    const posts = await Post.all();
    const postUrl = await Drive.getUrl("./post");

    return inertia.render("Home/Collections", {
      auth,
      avatarUrl,
      authenticateProfile,
      categories,
      categorieUrl,
      products,
      productUrl,
      posts,
      postUrl,
      users,
    });
  }

  public async search({ inertia, request, auth }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } =
      await ProfileService.getAthenticateProfile(auth);
    const users = await User.all();

    const keyWord = request.input("keyWord");

    const otherProducts = await Product.all();
    const otherUsersProfile = await Profile.all();

    const productUrl = await Drive.getUrl("./products");
    const bannerUrl = await Drive.getUrl("./banner");

    let product =
      (await Product.query()
        .where("name", keyWord)
        .where("description", keyWord)) || new Product();

    let user = (await User.findBy("username", keyWord)) || new User();

    let profileUser =
      (await Profile.findBy("firstname", keyWord)) ||
      (await Profile.findBy("lastname", keyWord)) ||
      new Profile();

    return inertia.render("Home/Search", {
      auth,
      avatarUrl,
      bannerUrl,
      authenticateProfile,
      product,
      productUrl,
      otherProducts,
      users,
      keyWord,
      otherUsersProfile,
      profileUser,
      user,
    });
  }

  public async artistList({ inertia, auth }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } =
      await ProfileService.getAthenticateProfile(auth);
    const artists = await User.all();
    const profiles = await Profile.all();
    const bannerUrl = await Drive.getUrl("./banner");

    return inertia.render("Home/ArtistList", {
      auth,
      avatarUrl,
      authenticateProfile,
      artists,
      profiles,
      bannerUrl,
    });
  }

  public async categorieList({ inertia, auth, params }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } =
      await ProfileService.getAthenticateProfile(auth);

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl("./Categories");

    const categorie = await Categorie.findBy(
      "name",
      params.name.split("_").join(" ")
    );

    const products = await Product.query().where("categorie_id", categorie!.id);

    const productUrl = await Drive.getUrl("./products");

    const artists = await User.all();

    return inertia.render("Home/Categories", {
      auth,
      avatarUrl,
      authenticateProfile,
      categorie,
      categories,
      categorieUrl,
      products,
      productUrl,
      artists,
    });
  }
}
