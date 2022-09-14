import { Joi } from '../helpers'

export const signUpSchemas = {
  inputSchema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

export const loginSchemas = {
  inputSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}
