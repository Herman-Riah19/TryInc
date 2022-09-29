import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import User from 'App/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'
import { string } from '@ioc:Adonis/Core/Helpers'
import ProfileValidator from 'App/Validators/ProfileValidator'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async showProfile({ inertia, params, auth }: HttpContextContract) {
    const username = await params.username.replace('_', ' ')
    const user = await User.findBy('username', username)
    const profile = await Profile.findBy('user_id', user?.id)

    const products = Array<Product>()
    const allProducts = await Product.all()
    allProducts.map((prod) => {
      if (prod.artisteId == user?.id) {
        products.push(prod)
      }
    })

    const productUrl = await Drive.getUrl('./collections')
    const profileAvatarUrl = await Drive.getUrl(`./avatar`)
    const profileBannerUrl = await Drive.getUrl(`./banner`)
    return inertia.render('User/Profile', {
      user,
      profile,
      auth,
      products,
      productUrl,
      profileAvatarUrl,
      profileBannerUrl,
    })
  }

  public async showEditProfile({ inertia, params, auth }: HttpContextContract) {
    const user = await User.findBy('id', params.id)

    const profile = await Profile.findBy('user_id', user?.id)
    const profileAvatarUrl = await Drive.getUrl(`./avatar`)
    const profileBannerUrl = await Drive.getUrl(`./banner`)
    return inertia.render('User/EditUser', {
      user,
      profile,
      auth,
      profileAvatarUrl,
      profileBannerUrl,
    })
  }

  public async edit({ request, response, session, auth }: HttpContextContract) {
      const profile = await Profile.findBy('user_id', auth.user?.id)

      const avatarFile = await request.file('avatar')
      if (avatarFile) {
        const avatarName = string.generateRandom(32) + '.' + avatarFile.extname
        await avatarFile.moveToDisk(`./avatar/`, {
          name: avatarName,
        })
        profile.avatar = avatarName
      }

      const bannerFile = await request.file('banner')
      if (bannerFile) {
        const bannerName = string.generateRandom(32) + '.' + bannerFile.extname
        await bannerFile.moveToDisk(`./banner/`, {
          name: bannerName,
        })
        profile.banner = bannerName
      }

      const data = await request.validate(ProfileValidator)
      await profile.merge({ ...data }).save()

    session.flash('success', 'Your profile is enter')
    return response.redirect(`/profile/${auth.user?.username}`)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
