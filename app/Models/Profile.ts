import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column()
  public userId!: number;

  @column()
  public avatar!: string;

  @column()
  public banner!: string;

  @column()
  public lastname!: string;

  @column()
  public firstname!: string;

  @column()
  public biography!: string;

  @column()
  public location!: string;

  @column()
  public company!: string;

  @column()
  public numberFollower!: number | 0;

  @column()
  public facebookUrl!: string;

  @column()
  public instagramUrl!: string;

  @column()
  public twitterUrl!: string;

  @column()
  public youtubeUrl!: string;

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime;

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>;
}
