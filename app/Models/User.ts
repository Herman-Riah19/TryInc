import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Profile from './Profile'
import EmailHistory from './EmailHistory'
import Post from './Post'
import Product from './Product'

class User extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public roleId!: number

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['username']
  })
  public username!: string

  @column()
  public email!: string

  @column({ serializeAs: null })
  public password!: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Post)
  public posts!: HasMany<typeof Post>

  @hasMany(() => Product)
  public products!: HasMany<typeof Product>
  
  @belongsTo(() => Role)
  public role!: BelongsTo<typeof Role>

  @hasOne(() => Profile)
  public profile!: HasOne<typeof Profile>

  @hasMany(() => EmailHistory)
  public emailHistory!: HasMany<typeof EmailHistory>
}

export default User
