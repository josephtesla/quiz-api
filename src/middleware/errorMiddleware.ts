import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { serializeError } from "../helpers/error";

interface ErrorMiddlewareParams {
  logger: Logger;
}

export const errorMiddleware =
  ({ logger }: ErrorMiddlewareParams) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await next();
    } catch (error: any) {
      const { httpStatus, ...errorData } = serializeError(error);
      if (httpStatus === 500) {
        logger.error(
          `Internal server error: ${error.message as string}\n${
            error.stack as string
          }\n`
        );
      }

      res.status(httpStatus).json({ error: errorData });
    }
  };
