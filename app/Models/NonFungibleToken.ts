import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from './User'

export default class NonFungibleToken extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public title!: string

  @column()
  public description!: string | null

  @column()
  public price!: number  
  
  
  @column()
  public asset!: string
  
  @column()
  public receiver!: string

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
