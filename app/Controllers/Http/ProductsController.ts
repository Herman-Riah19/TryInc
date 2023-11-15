import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Enums/Constants'
import Categorie from 'App/Models/Categorie'
import Product from 'App/Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'
import Application from '@ioc:Adonis/Core/Application'
import ProductValidator from 'App/Validators/ProductValidator'
import AssetService from 'App/Services/AssetService'
import { ProfileService } from 'App/Services/ProfileService'
import Collection from 'App/Models/Collection'
import Like from 'App/Models/Like'
import Comment from 'App/Models/Comment'
import CommentValidator from 'App/Validators/CommentValidator'

export default class ProductsController {
  public async create({ inertia, auth, response }: HttpContextContract) {
    if(!auth) {
      return response.redirect().toRoute('user.login')
    }
    const categories = await Categorie.all()
    const stateEnum = State
    const allCollections = await Collection.all()
    const authCollections = Array<Collection>()

    allCollections.map(collection => {
      if(collection.userId == auth.user?.id) {
        authCollections.push(collection)
      }
    })

    return inertia.render('Product/ProductCreate', { 
      categories, stateEnum, auth, authCollections 
    })
  }

  public async store({ request, response, session, auth }: HttpContextContract) {
    const product = new Product()

    product.asset = await AssetService.uploadFile(
      request,
      `./products/${auth.user?.username}/`,
      'asset',
    )

    const data = await request.validate(ProductValidator)

    product
      .merge({ ...data, nomberLike: 0, nomberComment: 0, stateId: State.PUBLIC, userId: auth.user?.id })
      .save()
    session.flash('success', 'Your product is saved')
    return response.redirect('/')
  }

  public async show({ inertia, params, auth }: HttpContextContract) {
    const product = await Product.findBy('id', params.id)
    const assetUrl = await Drive.getUrl('./products')

    const AllComments = await Comment.all()
    const allProfiles = await Profile.all()
    const profileComments = Array<Profile>()
    const comments = Array<Comment>()
    AllComments.filter(comment => {
      if(comment.productId === product?.id) {
        comments.push(comment);

        allProfiles.filter(prof => {
          if(comment.userId === prof.userId) {
            profileComments.push(prof)
          }
        })
      }
    })
    
    const artist = await User.findBy('id', product?.userId)
    const profile = await Profile.findBy('user_id', artist?.id)

    const categorie = await Categorie.findBy('id', product?.categorieId)

    const otherProducts = Array<Product>()
    const allProducts = await Product.all()
    allProducts.map((prod) => {
      if (prod.name != product?.name) {
        if (prod.categorieId == product?.categorieId) {
          otherProducts.push(prod)
        }
      }
    })

    let liked: boolean = false
    const hasBeenLiked = await Like.findBy('product_id', product?.id)
    if(hasBeenLiked && hasBeenLiked?.userId == auth.user?.id){
      liked = hasBeenLiked!.isLiked 
    }

    const {
      avatarUrl,
      authenticateProfile,
    } = await ProfileService.getAthenticateProfile(auth)

    const users = await User.all()

    return inertia.render('Product/ProductShow', {
      product, assetUrl, liked,
      artist, profile, avatarUrl,
      categorie, otherProducts,
      comments, profileComments,
      auth, users, authenticateProfile
    })
  }

  public async download({ response, params }: HttpContextContract) {
    const file = await Product.findBy('id', params.id)
    const artiste = await User.findBy('id', file?.userId)
    const filePath = Application.tmpPath(
      `uploads/collections/${artiste?.username}/${file?.name}`,
    )

    return response.download(filePath, true)
  }

  public async addComment({params, request, response, session, auth}: HttpContextContract) {
      if(!auth) {
          return response.redirect().toRoute('user.login')
      }
      const product = await Product.findBy('id', params.id);

      const data = await request.validate(CommentValidator);

      const comment = new Comment();

      comment.merge({
        ...data,
        stateId: State.PUBLIC, 
        userId: auth.user?.id, 
        productId: product?.id
      }).save()
      console.log(data)
          
      product!.nomberComment += 1;
      product?.save();
      session.flash('success', 'Your product is commented')
      return response.redirect(`/product/show/${product?.id}`)
  }

  public async handleIsLiked({params, response, auth}: HttpContextContract) {
    const product = await Product.findBy('id', params.id)
    if(!auth) {
      return response.redirect().toRoute('user.login')
    } 
    const hasBeenLiked = await Like.findBy('product_id', product?.id)
    if(auth && hasBeenLiked?.userId == auth.user?.id) {
        hasBeenLiked!.isLiked = !hasBeenLiked!.isLiked
        hasBeenLiked?.save()
        product!.nomberLike = hasBeenLiked!.isLiked ? product!.nomberLike++: product!.nomberLike--
        product?.save()
        return response.redirect(`/product/show/${product?.id}`)
    } 

    const isLiked = new Like()
    isLiked.merge({
      userId: auth.user?.id,
      productId: product?.id,
      isLiked: true
    }).save()

    product!.nomberLike += 1
    product?.save()
    return response.redirect(`/product/show/${product?.id}`)
  }
}
