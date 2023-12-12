import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Product from 'App/Models/Product'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ApiController {
    public async getAllUsers({session, response}: HttpContextContract) {
        interface UserProfile{
            user: User;
            profile: Profile;
        }
        const allUsers = await User.all()
        const allProfiles = await Profile.all()

        const users = new Array<UserProfile>()
        
        allUsers.map(user => {
            allProfiles.map(profile => {
                if(user.id == profile.userId){
                    users.push({user, profile})
                }
            })
        })
        session.flash('succes','This is the liste of the users and there profile')
        return response.status(200).json(users)
    }

    public async getAllProducts({response}: HttpContextContract) {
        interface ProductAsset{
            product: Product;
            comments: Array<Comment>;
        }
        const allComments = await Comment.all()
        const allProducts = await Product.all()
        const url = await Drive.getUrl("./products")
        const products = Array<ProductAsset>()
        allProducts.map(product => {
            const comments = Array<Comment>()
            allComments.map(comment => {
                if(comment.productId == product.id){
                    comments.push(comment)
                }
            })
            product.asset = `${url}/${product.asset}`
            products.push({product,comments})
        })
        return response.status(200).json(products)
    }
}
