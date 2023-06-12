import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Categorie from 'App/Models/Categorie'
import AssetService from 'App/Services/AssetService'
import CategorieValidator from 'App/Validators/CategorieValidator'

export default class DashbordsController {
  async showDashbord({ inertia, auth, response }: HttpContextContract) {
    if(auth.user?.roleId != 2) {
      return response.redirect('/login')
    }
    const products = await Product.all()
    const productUrl = await Drive.getUrl('./products')

    const users = await User.all()

    const categories = await Categorie.all()
    const categorieUrl = await Drive.getUrl('./Categories')

    return inertia.render('Dashbord/Dashbord', {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
      auth
    })
  }

  public async collections({ inertia, auth, response }:HttpContextContract) {
    if(auth.user?.roleId != 2) {
      return response.redirect('/login')
    }
    const products = await Product.all()
    const productUrl = await Drive.getUrl('./products')

    const users = await User.all()

    const categories = await Categorie.all()
    const categorieUrl = await Drive.getUrl('./Categories')

    return inertia.render('Dashbord/DashbordCollection', {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
      auth
    })
  }

  public createCategorie({ inertia,auth, response }: HttpContextContract) {
    if(auth.user?.roleId != 2) {
      return response.redirect('/login')
    }
    return inertia.render('Dashbord/CategorieForm')
  }

  public async saveCategorie({ request, response, session, }: HttpContextContract) {
    const categorie = new Categorie()

    categorie.asset = await AssetService.uploadFile(
      request,
      './Categories/',
      'asset',
    )

    const data = await request.validate(CategorieValidator)
    await categorie.merge({ ...data }).save()
    session.flash('success', 'Your Categorie is saved')
    return response.redirect('/dashbord')
  }

  public async deleteCategorie({ response, params }: HttpContextContract) {
    const categorie = await Categorie.findOrFail(params.id)
    await categorie?.delete()
    return response.redirect('/dashbord/collections')
  }

  public async editProduct({ inertia, auth, response }: HttpContextContract) {
    if(auth.user?.roleId != 2) {
      return response.redirect('/login')
    }
    return inertia.render('Dashbord/EditProduct', {auth})
  }

  public async deleteProduct({ params, response }: HttpContextContract) {
    const product = await Product.findBy('id',params.id)

    await product?.delete()
    return response.redirect('/dashbord/collections')
  }
}
