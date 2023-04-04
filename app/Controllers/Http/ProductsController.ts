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

export default class ProductsController {
  async create({ inertia, auth, response }: HttpContextContract) {
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

    return inertia.render('Product/ProductCreate', { categories, stateEnum, auth, authCollections })
  }

  async store({ request, response, session, auth }: HttpContextContract) {
    const product = new Product()

    product.asset = await AssetService.uploadFile(
      request,
      `./products/${auth.user?.username}/`,
      'asset',
    )

    const data = await request.validate(ProductValidator)

    product
      .merge({ ...data, stateId: State.PUBLIC, userId: auth.user?.id })
      .save()
    session.flash('success', 'Your product is saved')
    return response.redirect('/')
  }

  async show({ inertia, params, auth }: HttpContextContract) {
    const product = await Product.findBy('id', params.id)
    const assetUrl = await Drive.getUrl('./products')
    
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

    const {
      avatarUrl,
      authenticateProfile,
    } = await ProfileService.getAthenticateProfile(auth)

    const users = await User.all()

    return inertia.render('Product/ProductShow', {
      product,
      auth,
      assetUrl,
      artist,
      profile,
      avatarUrl,
      categorie,
      otherProducts,
      users,
      authenticateProfile
    })
  }

  async download({ response, params }: HttpContextContract) {
    const file = await Product.findBy('id', params.id)
    const artiste = await User.findBy('id', file?.userId)
    const filePath = Application.tmpPath(
      `uploads/collections/${artiste?.username}/${file?.name}`,
    )

    response.download(filePath, true)
  }
}
