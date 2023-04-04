import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Categorie extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string
  
  @column()
  public description!: string | null
  
  @column()
  public slug!: string

  @column()
  public asset!: string
  
  @hasMany(() => Product)
  public products!: HasMany<typeof Product>
  
  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
