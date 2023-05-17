import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .unsigned()
        .references('users.id')
        .notNullable()
      table.integer('categorie_id')
        .unsigned()
        .references('categories.id')
        .nullable()
      table.integer('collection_id').unsigned().references('collections.id').nullable()
      table.string('name',255).unique().notNullable()
      table.text('description').nullable()
      table.boolean('is_free').notNullable().defaultTo(false)
      table.integer('nomber_like').nullable()
      table.string('asset').notNullable()
      table.integer('state_id').unsigned().notNullable()
      table.timestamp('publish_at').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
