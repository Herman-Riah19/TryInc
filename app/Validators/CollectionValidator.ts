import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CollectionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    collectionName: schema.string({ trim: true }, [rules.maxLength(100)]),
    collectionDescription: schema.string.optional({ trim: true }, [rules.maxLength(2524)]),
  })

  public messages: CustomMessages = {}
}
