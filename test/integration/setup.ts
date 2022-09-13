/* eslint-env jest */
import mongoose from 'mongoose'

beforeAll(async () => {
  let mongoUrl: string = ''
  if (process.env.MONGO_URL != null) mongoUrl = process.env.MONGO_URL

  await mongoose.connect(mongoUrl)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  for (const coll of collections) {
    await coll.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
})
