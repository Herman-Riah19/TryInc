import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from 'App/Models/Categorie'

class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(100)]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(2524)]),
    is_free: schema.boolean.optional(),
    price: schema.number(),
    categorieId: schema.number.optional([
      rules.exists({column: Categorie.primaryKey, table: Categorie.table})
    ]),
  })
  public messages: CustomMessages = {}
}

export default ProductValidator 
