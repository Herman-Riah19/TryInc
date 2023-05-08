import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductInCollectionValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    products: schema.array().members(schema.number())
  })

  public messages: CustomMessages = {}
}
