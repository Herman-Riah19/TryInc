import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Enums/Constants';
import Comment from 'App/Models/Comment';
import Product from 'App/Models/Product';
import CommentValidator from 'App/Validators/CommentValidator'

export default class CommentsController {
    public async addComment({params, request, response, session, auth}: HttpContextContract) {
        if(!auth) {
            return response.redirect().toRoute('user.login')
        }
        const product = await Product.findBy('id', params.id);

        const data = await request.validate(CommentValidator);
   
        console.log(data)
        await Comment.create({
            ...data, 
            stateId: State.PUBLIC, 
            userId: auth.user?.id, 
            productId: product?.id})
            
        product!.nomberComment += 1;
        product?.save();
        return response.redirect(`/product/show/${product?.id}`)
    }
}
