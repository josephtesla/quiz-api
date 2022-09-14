export type AnyFunction = (...input: any[]) => any

export const modelTransformFn = (_doc: any, ret: any): void => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};
