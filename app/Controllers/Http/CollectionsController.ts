import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AssetService from 'App/Services/AssetService'
import Collection from 'App/Models/Collection'
import CollectionValidator from 'App/Validators/CollectionValidator'
import Product from 'App/Models/Product'
import ProductInCollectionValidator from 'App/Validators/ProductInCollectionValidator'

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
        collection.asset = await AssetService.uploadFile(
        request,
        `./collections/${auth.user?.username}/`,
        'asset',
        )

        const data = await request.validate(CollectionValidator)

        collection.merge({ ...data, userId: auth.user?.id }).save()
        session.flash('success', 'Your collection is saved')

        return response.redirect('/collection/add-product')
    }

    public async addProductInCollection({ inertia, auth, response }: HttpContextContract) {
        if(!auth) {
            return response.redirect('/login')
        }

        const products = Array<Product>()
        const allProducts = await Product.all()
        allProducts.map(product => {
            if(product.userId == auth.user?.id)
                products.push(product)
        })
        return inertia.render('User/AddProductInCollection', { products })
    }

    public async saveProductInCollection({ request, response, auth, session}:HttpContextContract) {
        const data = await request.validate(ProductInCollectionValidator)
        const allCollection = await Collection.all()
        const currentCollection = allCollection[1]

        for(let i = 0; i < data.products.length; i++) {
            const product = await Product.findOrFail(i)
            product.collectionId = currentCollection.id
            await product.save()
        }
        session.flash('success', 'Your collection is saved')
        return response.redirect(`/profile/${auth.user?.username}`)
    }
}
