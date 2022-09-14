import { NextFunction, Request, Response } from "express"
import { NotAuthenticatedError, serializeError } from "../helpers/error"

export const ensureAuthenticated = (req: Request, res:Response, next:NextFunction) => {
  if (!req.user){
    const error = new NotAuthenticatedError("Not authenticated, please sign in")
    const { httpStatus, ...errorData } = serializeError(error);
    return res.status(httpStatus).json({ error: errorData });
  }

  return next()
}
