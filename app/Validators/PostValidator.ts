import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(200)]),
    description: schema.string.optional({ trim: true }),
    body: schema.string.optional({ trim: true }),
  })
  public messages: CustomMessages = {}
}
