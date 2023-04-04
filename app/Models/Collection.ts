import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';
import Product from 'App/Models/Product';

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number

  @column()
  public collectionName!: string

  @column()
  public collectionDescription!: string | null

  @column()
  public collectionAsset!: string

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @hasMany(() => Product)
  public products!: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
