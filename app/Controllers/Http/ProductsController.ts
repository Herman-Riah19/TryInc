import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Enums/Constants'
import Categorie from 'App/Models/Categorie'
import Product from 'App/Models/Product'
import { string } from '@ioc:Adonis/Core/Helpers'
import ProductValidator from 'App/Validators/ProductValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'
import Application from '@ioc:Adonis/Core/Application';

export default class ProductsController {
    async create({inertia}: HttpContextContract){
        const categories = await Categorie.all()
        const stateEnum = State
        return inertia.render('Product/ProductCreate', { categories, stateEnum })
    }

    async store({request, response, session, auth}: HttpContextContract) {
        const product = new Product()
        const assetThumbnail = await request.file('asset')
        if(assetThumbnail) {
            const newNameProduct = string.generateRandom(32) + '.' + assetThumbnail.extname
            await assetThumbnail.moveToDisk(`./collections/${auth.user?.username}/`, { name: newNameProduct })
            product.asset = newNameProduct
        }

        const data = await request.validate(ProductValidator)
        product.merge({...data, stateId: State.PUBLIC, artisteId: auth.user?.id}).save()
        session.flash('success', 'Your product is enter')
        return response.redirect('/')
    }

    async show({inertia, params, auth}: HttpContextContract) {
        const product = await Product.findBy('id', params.id)
        const assetUrl = await Drive.getUrl('./collections')
        const avatarUrl = await Drive.getUrl('./avatar')
        const artist = await User.findBy('id',product?.artisteId)
        const profile = await Profile.findBy('user_id', artist?.id)

        const categorie = await Categorie.findBy('id', product?.categorieId)

        const otherProducts = Array<Product>()
        const allProducts = await Product.all()
        allProducts.map(prod => {
            if(prod.name != product?.name) {
                if(prod.categorieId == product?.categorieId) {
                    otherProducts.push(prod)
                }
            }
        })

        const users = await User.all()

        let currentProfile = null
        if(auth.isAuthenticated) {
            currentProfile = await Profile.findBy('user_id', auth.user?.id)
        }

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
            currentProfile
        })
    }

    async download({response, params}: HttpContextContract) {
        const file = await Product.findBy('id', params.id)
        const artiste = await User.findBy('id', file?.artisteId)
        const filePath = Application.tmpPath(`uploads/collections/${artiste?.username}/${file?.name}`)

        response.download(filePath, true)
    }
}
