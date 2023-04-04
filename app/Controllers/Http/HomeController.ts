import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Post from "App/Models/Post";
import Product from "App/Models/Product";
import User from "App/Models/User";
import Profile from "App/Models/Profile";
import { ProfileService } from "App/Services/ProfileService";
import Categorie from '../../Models/Categorie';

export default class HomeController {
  public async home({ inertia, auth }: HttpContextContract) {
    const posts = await Post.all();
    const postUrl = await Drive.getUrl("./post");

    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");

    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl('./Categories');

    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);

    const existProfiles = await Profile.all();

    const bannerUrl = await Drive.getUrl('./banner');

    return inertia.render("Home/Home", { 
      users, auth, authenticateProfile, 
      avatarUrl, bannerUrl, existProfiles,
      posts, postUrl, 
      products, productUrl, 
      categories, categorieUrl, 
    });
  }

  public async collection({inertia, auth}: HttpContextContract) {
    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);
    const users = await User.all();

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl('./Categories');

    const products = await Product.all();
    const productUrl = await Drive.getUrl("./products");
    return inertia.render('Home/Collections', { 
      auth, avatarUrl, authenticateProfile,
      categories, categorieUrl, 
      products, productUrl, 
      users 
    });
  }

  public async search({ inertia, request, auth }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);

    const products = await Product.query().whereRaw(
            `name = '${request.input('keyWord')}'`
    );

    const productUrl = await Drive.getUrl("./products");

    const users = await User.all();

    return inertia.render('Home/Search', { auth, avatarUrl, authenticateProfile, products, productUrl, users });
  }

  public async artistList({ inertia, auth }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);
    const artists = await User.all();
    const profiles = await Profile.all();
    const bannerUrl = await Drive.getUrl('./banner');

    return inertia.render("Home/ArtistList",{ auth, avatarUrl, authenticateProfile, artists, profiles, bannerUrl });
  }

  public async categorieList({ inertia, auth, params }: HttpContextContract) {
    const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth);

    const categories = await Categorie.all();
    const categorieUrl = await Drive.getUrl('./Categories');

    const categorie = await Categorie.findBy('name', params.name.split('_').join(' '))

    const products = Array<Product>()
    const allProducts = await Product.all()
    allProducts.map((prod) => {
      if(prod.categorieId == categorie?.id) {
        products.push(prod)
      }
    })

    const productUrl = await Drive.getUrl("./products");

    const artists = await User.all();

    return inertia.render("Home/Categories", {
      auth, avatarUrl, authenticateProfile,
      categorie, categories, categorieUrl,
      products, productUrl,
      artists
    });
  }
}
