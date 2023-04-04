import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AssetService from 'App/Services/AssetService'
import Collection from 'App/Models/Collection'
import CollectionValidator from 'App/Validators/CollectionValidator'

export default class CollectionsController {

    public async createCollection({ inertia, auth, response }: HttpContextContract) {
        if(!auth) {
            return response.redirect().toRoute('user.login')
        }

        const user = auth.user
        return inertia.render('User/CreateCollection', { user })
    }

    public async saveCollection({ request, response, session, auth }: HttpContextContract) {

        const collection = new Collection()
        collection.collectionAsset = await AssetService.uploadFile(
        request,
        `./collections/${auth.user?.username}/`,
        'collectionAsset',
        )

        const data = await request.validate(CollectionValidator)

        collection.merge({ ...data, userId: auth.user?.id }).save()
        session.flash('success', 'Your collection is saved')

        return response.redirect().toRoute('profile.show', [auth.user?.username])
    }
}
