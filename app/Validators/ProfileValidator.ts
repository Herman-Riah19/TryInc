import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastname: schema.string({trim: true}, [rules.nullable()]),
    firstname: schema.string({trim: true}, [rules.nullable()]),
    biography: schema.string({trim: true}, [rules.nullable()]),
    location: schema.string({trim: true}, [rules.nullable()]),
    company: schema.string({trim: true}, [rules.nullable()]),
    facebookUrl: schema.string({trim: true}, [ rules.url(), rules.nullable()]),
    instagramUrl: schema.string({trim: true}, [ rules.url(), rules.nullable()]),
    twitterUrl: schema.string({trim: true}, [ rules.url(), rules.nullable()]),
    youtubeUrl: schema.string({trim: true}, [ rules.url(), rules.nullable()]),     
  })

  public messages: CustomMessages = {}
}
