import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import State from 'App/Enums/Constants'
import Comment from 'App/Models/Comment'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number

  @column()
  public title!: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug!: string

  @column()
  public description!: string | null
  
  @column()
  public body!: string | null
  
  @column()
  public metaDescription!: string | null

  @column()
  public postImage!: string

  @column()
  public stateId!: State


  @column.dateTime()
  public publishAt!: DateTime | null

  @column()
  public timezone!: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments!: HasMany<typeof Comment>

  @computed()
  public get publishAtDateString() {
    let date = this.publishAt
    if(date && this.timezone) {
      date = DateTime.now()
      date = date.set(this.publishAt!.toObject()).setZone(this.timezone)
    }
    return date?.toFormat('yyyy-MM-dd')
  }

  @computed()
  public get publishAtTimeString() {
    let date = this.publishAt
    if(date && this.timezone) {
      date = DateTime.now()
      date = date.set(this.publishAt!.toObject()).setZone(this.timezone)
    }
    return date?.toFormat('HH:mm')
  }

  @computed()
  public get isPublished(): boolean {
    const isPublic = this.stateId === State.PUBLIC
    if(!this.publishAt) return isPublic

    const isPastPublishAt = this.publishAt.diffNow().as('seconds')
    return isPublic && isPastPublishAt < 0
  }


  @computed()
  public get isViewable(): boolean {
    const isPublicOrUnlisted = this.stateId === State.PUBLIC || this.stateId === State.UNLISTED 
    if(!this.publishAt) return isPublicOrUnlisted

    const isPastPublishAt = this.publishAt.diffNow().as('seconds')
    return isPublicOrUnlisted && isPastPublishAt < 0
  }
}
