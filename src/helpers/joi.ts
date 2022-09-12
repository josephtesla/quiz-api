import { Schema } from 'joi'

export const validate = (schema: Schema, obj: any): any => {
  const { error, value } = schema.validate(obj, { abortEarly: false })
  if (error != null) {
    throw error
  }

  return value
}
