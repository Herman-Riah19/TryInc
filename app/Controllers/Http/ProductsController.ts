import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import State from "App/Enums/Constants";
import Categorie from "App/Models/Categorie";
import Product from "App/Models/Product";
import Drive from "@ioc:Adonis/Core/Drive";
import User from "App/Models/User";
import Profile from "App/Models/Profile";
import Application from "@ioc:Adonis/Core/Application";
import ProductValidator from "App/Validators/ProductValidator";
import AssetService from "App/Services/AssetService";
import { ProfileService } from "App/Services/ProfileService";
import Collection from "App/Models/Collection";
import Like from "App/Models/Like";
import Comment from "App/Models/Comment";
import CommentValidator from "App/Validators/CommentValidator";

export default class ProductsController {
  public async create({ inertia, auth, response }: HttpContextContract) {
    if (!auth) {
      return response.redirect().toRoute("user.login");
    }
    const categories = await Categorie.all();
    const stateEnum = State;
    const allCollections = await Collection.all();
    const authCollections = Array<Collection>();

    allCollections.map((collection) => {
      if (collection.userId == auth.user?.id) {
        authCollections.push(collection);
      }
    });

    return inertia.render("Product/ProductCreate", {
      categories,
      stateEnum,
      auth,
      authCollections,
    });
  }

  public async store({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const product = new Product();

    product.asset = await AssetService.uploadFile(
      request,
      `./products/${auth.user?.username}/`,
      "asset"
    );

    const data = await request.validate(ProductValidator);

    product
      .merge({
        ...data,
        nomberLike: 0,
        nomberComment: 0,
        stateId: State.PUBLIC,
        userId: auth.user?.id,
      })
      .save();
    session.flash("success", "Your product is saved");
    return response.redirect("/");
  }

  public async show({ inertia, params, auth }: HttpContextContract) {
    try {
      const productName = params.name.split("_").join(" ");
      const product = await Product.findBy("name", productName);
      const assetUrl = await Drive.getUrl("./products");

      const AllComments = await Comment.all();
      const allProfiles = await Profile.all();
      const profileComments = Array<Profile>();
      const comments = Array<Comment>();

      AllComments.filter((comment) => {
        if (comment.productId === product?.id) {
          comments.push(comment);

          allProfiles.filter((prof) => {
            if (comment.userId === prof.userId) {
              profileComments.push(prof);
            }
          });
        }
      });

      const artist = await User.findBy("id", product?.userId);
      const profile = await Profile.findBy("user_id", artist?.id);

      const categorie = await Categorie.findBy("id", product?.categorieId);

      const otherProducts = await Product.query()
        .whereNot("name", product!.name)
        .where("categorie_id", product!.categorieId);

      let liked: boolean = false;
      const hasBeenLikeds = await Like.query().where("product_id", product!.id);
      if (hasBeenLikeds.length > 0) {
        for await (const hasBeenLiked of hasBeenLikeds) {
          if (hasBeenLiked && hasBeenLiked?.userId == auth.user?.id) {
            liked = hasBeenLiked!.isLiked;
            break;
          } else {
            continue;
          }
        }
      }

      const { avatarUrl, authenticateProfile } =
        await ProfileService.getAthenticateProfile(auth);

      const users = await User.all();

      return inertia.render("Product/ProductShow", {
        product,
        assetUrl,
        liked,
        artist,
        profile,
        avatarUrl,
        categorie,
        otherProducts,
        comments,
        profileComments,
        auth,
        users,
        authenticateProfile,
      });
    } catch (error) {
      console.log("une erreur est survenue: " + error);
      return inertia.redirectBack();
    }
  }

  public async download({ response, params }: HttpContextContract) {
    const file = await Product.findBy("id", params.id);
    const artiste = await User.findBy("id", file?.userId);
    const filePath = Application.tmpPath(
      `uploads/collections/${artiste?.username}/${file?.name}`
    );

    return response.download(filePath, true);
  }

  public async addComment({
    params,
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    if (!auth) {
      return response.redirect().toRoute("user.login");
    }
    const product = await Product.findBy("id", params.id);

    const data = await request.validate(CommentValidator);

    const comment = new Comment();

    await comment
      .merge({
        ...data,
        stateId: State.PUBLIC,
        userId: auth.user?.id,
        productId: product?.id,
      })
      .save();
    console.log(data);

    product!.nomberComment += 1;
    product?.save();
    session.flash("success", "Your product is commented");
    return response.redirect(`/product/show/${product?.id}`);
  }

  public async productIsLiked({ params, response, auth }: HttpContextContract) {
    try {
      const product = await Product.query().where("id", params?.id).firstOrFail();
      if (!auth) {
        return response.redirect().toRoute("user.login");
      }

      const hasBeenLikeds = await Like.query().where("product_id", product!.id);
      if (hasBeenLikeds.length > 0) {
        for await (const hasBeenLiked of hasBeenLikeds) {
          if (hasBeenLiked?.userId == auth.user?.id) {
            hasBeenLiked!.isLiked = !hasBeenLiked!.isLiked;
            await hasBeenLiked?.save();
            product!.nomberLike = hasBeenLiked!.isLiked
              ? product!.nomberLike + 1
              : product!.nomberLike - 1;
            await product?.save();
            break;
          } 
        }
        return response.redirect(`/product/show/${product?.id}`);
      } else {
        const isLiked = new Like();
        await isLiked
          .merge({
            userId: auth.user?.id,
            productId: product?.id,
            isLiked: true,
          })
          .save();

        product!.nomberLike += 1;
        await product?.save();
        return response.redirect(`/product/show/${product?.id}`);
      }
    } catch (error) {
      console.log("Une erreur est survenue: " + error);
      return response.redirect().back();
    }
  }
}
