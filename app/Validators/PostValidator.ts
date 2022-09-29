import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(100)]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    body: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    publishAtDate: schema.date.optional({ format: 'yyyy-MM-dd' }),
		publishAtTime: schema.date.optional({ format: 'HH:mm' }),
  })
  public messages: CustomMessages = {}
}
