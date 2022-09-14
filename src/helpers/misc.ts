import { Schema } from 'joi'

export type AnyFunction = (...input: any[]) => any

export const modelTransformFn = (_doc: any, ret: any): void => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

export const JoiValidate = (schema: Schema, obj: any): any => {
  const { error, value } = schema.validate(obj, { abortEarly: false })
  if (error != null) {
    throw error
  }

  return value
}
