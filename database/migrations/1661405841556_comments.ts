import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.integer('post_id').unsigned().references('posts.id').nullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('product_id').unsigned().references('products.id').nullable()
      table.integer('reply_to').unsigned().references('comments.id').nullable()
      table.integer('state_id').notNullable()
      table.string('identity').nullable()
      table.text('body')

      table.integer('root_parent_id').unsigned().references('id').inTable('comments')
      table.integer('level_index').notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
