import { MongoMemoryReplSet } from 'mongodb-memory-server-core'

const EnvVars = Object.freeze({
  JWT_SECRET: "super-test-secrect",
  JWT_EXPIRES_IN: "24h"
})

export default async (): Promise<void> => {
  const mongo = await MongoMemoryReplSet.create({
    replSet: { storageEngine: 'wiredTiger' }
  })

  // @ts-expect-error
  global.mongo = mongo
  process.env.MONGO_URL = await mongo.getUri()

  for (const key in EnvVars) {
    process.env[key] = EnvVars[key as keyof typeof EnvVars]
  }
}
