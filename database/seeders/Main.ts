import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categorie from 'App/Models/Categorie'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run () {
    await Categorie.createMany([
      {
        name: 'Anime',
        slug: 'ANIME'
      },
      {
        name: 'Manga',
        slug: 'MANGA'
      },
      {
        name: 'Illustration',
        slug: 'ILL'
      },
      {
        name: 'Game caractère',
        slug: 'GAME'
      },
    ])

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
  }
}
