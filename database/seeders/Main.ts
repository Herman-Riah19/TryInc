import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Collection from 'App/Models/Collection'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {

    await Role.createMany([
      {
        id: 1,
        name: 'User',
        description: 'Authenticated User'
      },
      {
        id: 2,
        name: 'Admin',
        description: 'Super User'
      }
    ])

    await User.create({
      id: 1,
      roleId: 2,
      username: 'Admin',
      email: 'admin@gmail.com',
      password: 'hermann'
    })
  }
}
