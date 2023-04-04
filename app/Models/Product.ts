import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from './User'
import Categorie from './Categorie'
import State from 'App/Enums/Constants'
import Collection from './Collection'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id!: string

  @column()
  public userId!: number

  @column()
  public categorieId!: number
  
  @column()
  public collectionId!: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name']
  })
  public name!: string

  @column()
  public description!: string | null

  @column()
  public isFree!: boolean

  @column()
  public price!: number | 0

  @column()
  public asset!: string

  @column()
  public stateId!: State

  @column.dateTime()
  public publishAt!: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @belongsTo(() => Categorie)
  public categorie!: BelongsTo<typeof Categorie>

  @belongsTo(() => Collection)
  public collection!: BelongsTo<typeof Collection>

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
