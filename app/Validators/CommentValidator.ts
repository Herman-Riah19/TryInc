import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.nullable()]),
    body: schema.string({ trim: true }, [rules.nullable()]),
  })

  public messages: CustomMessages = {
    
  }
}
