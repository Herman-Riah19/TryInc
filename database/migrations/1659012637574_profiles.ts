import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').unique().notNullable()
      table.string('avatar')
      table.string('banner')
      table.string('lastname', 255).nullable()
      table.string('firstname', 255).nullable()
      table.text('biography').nullable().defaultTo('')
      table.string('location', 255).nullable()
      table.string('company', 255).nullable()
      table.string('facebook_url', 255).nullable()
      table.string('instagram_url', 255).nullable()
      table.string('twitter_url', 255).nullable()
      table.string('youtube_url', 255).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
