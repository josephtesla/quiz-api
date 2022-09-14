import { NextFunction, Request, Response } from 'express'
import { getTokenFromHeader, verifyAuthToken } from '../helpers/jwt'
import { IUser } from '../types'

interface CurrentUserMiddlewareParams {
  tokenSecret: string
}

export const currentUserMiddleware =
  ({ tokenSecret }: CurrentUserMiddlewareParams) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.get('Authorization')

      if (authHeader == null || authHeader === '') {
        req.user = null
        return await next()
      }

      const token = getTokenFromHeader(authHeader)

      let decodedToken
      try {
        decodedToken = verifyAuthToken(token, tokenSecret)
      } catch (err) {
        req.user = null
        return await next()
      }

      const user: IUser = decodedToken.user
      if (user == null) {
        throw new Error(
          'Invalid token payload. ' + 'Token must contain current user details'
        )
      }

      req.user = user
      return await next()
    }
