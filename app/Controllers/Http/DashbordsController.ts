import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashbordsController {
    async showDashbord({ inertia }: HttpContextContract) {
        return inertia.render('Dashbord/Dashbord')
    }
}
