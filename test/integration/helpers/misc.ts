import mongoose from 'mongoose'

// @ts-expect-error
export const id = (): string => mongoose.Types.ObjectId().toHexString()

export const mongooseDocToPlainObj = (doc: any): any =>
  JSON.parse(JSON.stringify(doc))
