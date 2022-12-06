import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategorieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(100)]),
    slug: schema.string({ trim: true }, [rules.maxLength(10)]),
  })

  public messages: CustomMessages = {
    'slug.max': 'Slug must be inferior or equal of 10 caracters',
  }
}
