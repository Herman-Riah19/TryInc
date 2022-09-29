import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import State from 'App/Enums/Constants'
import User from './User'
import Post from './Post'
import Product from './Product'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number | null

  @column()
  public postId!: number | null
  
  @column()
  public productId!: number | null

  @column()
  public replyTo!: number | null

  @column()
  public rootParentId!: number

  @column()
  public stateId!: number

  @column()
  public levelIndex!: number

  @column()
  public name!: string

  @column()
  public body!: string

  @column({ serializeAs: null })
  public identity!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @computed()
  public get isPublic() {
    return this.stateId === State.PUBLIC
  }

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post!: BelongsTo<typeof Post>

  @belongsTo(() => Product)
  public product!: BelongsTo<typeof Product>

  @hasMany(() => Comment, { foreignKey: 'replyTo' })
  public responses!: HasMany<typeof Comment>

  @belongsTo(() => Comment, { foreignKey: 'replyTo' })
  public parent!: BelongsTo<typeof Comment>

  @manyToMany(() => User, { pivotTable: 'comment_votes' })
  public userVotes!: ManyToMany<typeof User>

  @computed()
  public get createdAtCalendar() {
    return this.createdAt.toRelativeCalendar();
  }
} 
