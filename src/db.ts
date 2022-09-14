import mongoose from 'mongoose'
import { Config } from './config'
import { logger } from './logger'

const mongoURL: string = Config.MONGO_URL
if (mongoURL == null || mongoURL === '') logger.error('mongoURL not set')

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

mongoose
  .connect(mongoURL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => {
    logger.error(`Error connecting to MongoDB: ${err as string}`)
    process.exit(1)
  })
