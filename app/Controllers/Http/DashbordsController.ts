import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Categorie from 'App/Models/Categorie'
import AssetService from 'App/Services/AssetService'
import CategorieValidator from 'App/Validators/CategorieValidator'

export default class DashbordsController {
  async showDashbord({ inertia }: HttpContextContract) {
    const products = await Product.all()
    const productUrl = await Drive.getUrl('./collections')

    const users = await User.all()

    const categories = await Categorie.all()
    const categorieUrl = await Drive.getUrl('./Categories')

    return inertia.render('Dashbord/Dashbord', {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
    })
  }

  public async collections({ inertia }:HttpContextContract) {
    const products = await Product.all()
    const productUrl = await Drive.getUrl('./collections')

    const users = await User.all()

    const categories = await Categorie.all()
    const categorieUrl = await Drive.getUrl('./Categories')

    return inertia.render('Dashbord/DashbordCollection', {
      products,
      productUrl,
      users,
      categories,
      categorieUrl,
    })
  }

  public createCategorie({ inertia }: HttpContextContract) {
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

  public async editProduct({ inertia, auth }: HttpContextContract) {
    return inertia.render('Dashbord/EditProduct', {})
  }

  public async deleteProduct({ params, response }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    await product?.delete()
    return response.redirect('/dashbord/collections')
  }
}
