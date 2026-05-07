import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.string('title').notNullable()
      table.string('slug', 255).unique().notNullable()
      table.string('description', 255).nullable()
      table.text('body').nullable()
      table.string('meta_description', 255).nullable()
      table.string('post_image').nullable()
      table.integer('state_id').unsigned().notNullable()
      table.timestamp('publish_at').nullable()
      table.string('timezone', 50).nullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
