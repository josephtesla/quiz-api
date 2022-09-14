import dotenv from 'dotenv'
dotenv.config()

export const Config = Object.freeze({
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string
})
