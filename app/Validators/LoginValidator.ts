import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uid: schema.string(),
    password: schema.string(),
  });

  public messages: CustomMessages = {
    minLength:
      "{{ field }} must be at least {{ options.minLength }} characters long",
    maxLength:
      "{{ field }} must be less then {{ options.maxLength }} characters long",
    required: "{{ field }} is required",
    email: "{{ field }} must be a valid email",
    notIn: "This value is not allowed for {{ field }}",
    unique: "{{ field }} must be unique, and this value is already taken",
  };
}
