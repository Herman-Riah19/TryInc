import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({trim: true}, [ rules.unique({table: 'users', column: 'username', caseInsensitive: true})]),
    email: schema.string({trim: true}, [ rules.email(), rules.unique({table: 'users', column: 'email', caseInsensitive: true})]),
    password: schema.string({}, [ rules.minLength(4)]),
  })

  public messages: CustomMessages = {
    'username.unique': 'This username has already been taken',
    'username.regex': 'Username must be alphanumeric with -, ., or _',
    'email.unique': 'An account with this email already exists',
    'email.email': 'Please enter a valid email',
    'password.minLength': 'Password must be at least 4 characters long'
  }
}
