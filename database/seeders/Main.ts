import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categorie from 'App/Models/Categorie'
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

    await Categorie.createMany([
      {
        id: 1,
        name: 'Manga',
        slug: 'MANGA',
        description: "Japanese comic books and graphic novels considered collectively as a genre, The characters' faces beam the big-eyed, manically jolly winsomeness that in anime and manga signals contentment.",
        asset: 'manga-wallpaper.jpg'
      },
      {
        id: 2,
        name: 'Illustration',
        slug: 'ILL',
        description: "An Illustration is something that serves to illustrate: such as <ul>" + 
        "<li>a picture or diagram that helps make something clear or attractive</li>"+
        "<li>an example or instance that helps make something clear</li>" +
        "<li>the action of illustrating : the condition of being illustrated</li>" +
        "<li>archaic : the action of making illustrious or honored or distinguished</li></ul>",
        asset: 'illustration-wallpaper.jpeg'
      },
      {
        id: 3,
        name: 'Game Characters',
        slug: 'GAME',
        description: "A game character is a person, character, or any other entity acting in a game.<br/>"+
          "Game character may also refer to:<ul>"+
          "<li>Player character, a character or a role in tabletop and video games, who is controlled by a player, typically a protagonist of the game's plot</li>"+
          "<li>Alternate character, another controllable character in addition to the main player character</li>"+
          "<li>Non-player character, or NPC, a character controlled by a game-master in tabletop role-playing games or by a program in video games.</li>"+
          "<li>Boss (video games), a significant computer-controlled enemy in video games</li>"+
          "<li>Mob (video games), short for 'mobile'. A type of computer-controlled non-player characters, whose primary purpose is to be killed for experience, quest objective, or loot</li></ul>",
        asset: 'H5KOrkDH6Q5LM6SWoeYoF3K_tfyWTnoA.jpg'
      },
    ])
  }
}
