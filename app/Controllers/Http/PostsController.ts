import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'
import State from 'App/Enums/Constants'
import Categorie from 'App/Models/Categorie'

export default class PostsController {
    async create({inertia}:HttpContextContract) {
        const categories = await Categorie.all()
        return inertia.render('Post/PostCreate', { categories })
    }

    async store({ request, response, session, auth}:HttpContextContract) {
        const post = new Post()

        const thumbnail = await request.file('postImage')
        if(thumbnail) {
            const newName = string.generateRandom(32) + '.' + thumbnail.extname
            await thumbnail.moveToDisk('./post/', {name: newName})
            post.postImage = newName
        }

        const data = await request.validate(PostValidator)
        post.merge({...data, stateId: State.PUBLIC, userId: auth.user?.id }).save()
        session.flash('success', 'Your post is enter')
        return response.redirect('/')
    }
}
