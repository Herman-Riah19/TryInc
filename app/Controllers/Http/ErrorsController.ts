import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ErrorsController {
    public async pageNotFound({ view }: HttpContextContract) {
        return view.render('errors/not-found')
    }
}
