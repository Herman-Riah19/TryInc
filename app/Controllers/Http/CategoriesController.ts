import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from 'App/Models/Categorie'
import CategorieValidator from 'App/Validators/CategorieValidator'
import AssetService from 'App/Services/AssetService'

export default class CategoriesController {
  public formCategorie({ inertia }: HttpContextContract) {
    return inertia.render('Dashbord/CategorieForm')
  }

  public async saveCategorie({ request, response, session }: HttpContextContract) {
    const categorie = new Categorie()

    categorie.asset = await AssetService.uploadFile(request, './Categories/', 'asset')

    const data = await request.validate(CategorieValidator)
    categorie.merge({ ...data }).save()
    session.flash('success', 'Your Categorie is saved')
    return response.redirect('/dashbord')
  }
}
