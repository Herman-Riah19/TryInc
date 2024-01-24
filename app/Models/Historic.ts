import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import User from './User'

export default class Historic extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public action!:string | ''

  @column()
  public description!:string | ''

  @column()
  public status!: string

  @column()
  public senderId!: number

  @column()
  public receiverId!: number

  @column()
  public productId!: number

  @belongsTo(() => Product)
  public product!: BelongsTo<typeof Product>

  @belongsTo(() => User)
  public sender!: BelongsTo<typeof User>
  
  @belongsTo(() => User)
  public receiver!: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
