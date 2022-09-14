import jwt, { JwtPayload } from 'jsonwebtoken'
import { Config } from '../config'
import { IUser } from '../types'

const { JWT_EXPIRES_IN, JWT_SECRET } = Config

export const verifyAuthToken = (token: string, secret: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload

export const getTokenFromHeader = (header: string): string =>
  (header ?? '').replace('Bearer ', '')

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}
