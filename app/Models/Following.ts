import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class Following extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column()
  public followingId!: number;

  @column()
  public followerId!: number;

  @column()
  public isFollowed!: boolean | false;

  @belongsTo(() => User)
  public following!: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime;
}
