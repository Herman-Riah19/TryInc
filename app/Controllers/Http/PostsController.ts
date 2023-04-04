import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Drive from "@ioc:Adonis/Core/Drive"
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'
import State from 'App/Enums/Constants'
import Categorie from 'App/Models/Categorie'
import { ProfileService } from 'App/Services/ProfileService'

export default class PostsController {
    public async create({inertia}:HttpContextContract) {
        const categories = await Categorie.all()
        return inertia.render('Dashbord/PostCreate', { categories })
    }

    public async store({ request, response, session, auth}:HttpContextContract) {
        const post = new Post()

        const thumbnail = await request.file('postImage')
        if(thumbnail) {
            const newName = `${string.generateRandom(32)}.${thumbnail.extname}`
            await thumbnail.moveToDisk('./post/', {name: newName})
            post.postImage = newName
        }

        const data = await request.validate(PostValidator)
        post.merge({...data, stateId: State.PUBLIC, userId: auth.user?.id }).save()
        session.flash('success', 'Your post is enter')
        return response.redirect('/')
    }

    public async show({ inertia, params, auth }: HttpContextContract) {
        const post = await Post.findBy('slug', params.slug)
        const posts = await Post.all()
        const postUrl = await Drive.getUrl("./post")

        const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth)

        return inertia.render('Home/PostShow', {post, auth, posts, postUrl, avatarUrl, authenticateProfile})
    }

    public async postList({ inertia, auth }: HttpContextContract) {
        const posts = await Post.all()
        const postUrl = await Drive.getUrl("./post")

        const { avatarUrl, authenticateProfile } = await ProfileService.getAthenticateProfile(auth)

        return inertia.render('Home/PostList', { auth, posts, postUrl, avatarUrl, authenticateProfile })
    }
}
