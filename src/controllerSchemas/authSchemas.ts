import Joi from "joi";

const signUpInputSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
}); 

const loginInputSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}); 

export const signUpValidationSchemas = {
  inputSchema: signUpInputSchema
}

export const loginValidationSchemas = {
  inputSchema: loginInputSchema
}
