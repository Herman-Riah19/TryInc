import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'historics'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('action').notNullable()
      table.string('description').notNullable()
      table.string('status')
      table.integer('sender_id')
        .unsigned()
        .references('users.id')
        .notNullable()
      table.integer('receiver_id')
        .unsigned()
        .references('users.id')
        .notNullable()
      table.integer('product_id')
        .unsigned()
        .references('products.id')
        .notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
