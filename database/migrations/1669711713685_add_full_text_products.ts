import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.raw('ALTER TABLE products ADD FULLTEXT fulltext_index(name, description)')
  }

  public async down () {
    this.schema.raw('ALTER TABLE products DROP INDEX fulltext_index')
  }
}
