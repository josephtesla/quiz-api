import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { ObjectSchema } from "joi";
import { AnyFunction, JoiValidate } from ".";
import { IUser } from "../types";
import { RequestValidationError } from "./error";
// import { StateAttributes } from '../middleware'

export interface WrapperArguments {
  input: any;
  params: any;
  query: any;
  user: IUser | undefined | null;
  headers: IncomingHttpHeaders;
}

export interface ValidationSchemas {
  paramsSchema?: ObjectSchema;
  inputSchema?: ObjectSchema;
  querySchema?: ObjectSchema;
}

const wrapControllerArgs = (req: Request): WrapperArguments => ({
  input: req.body,
  params: req.params,
  query: req.query,
  user: req.user,
  headers: req.headers,
});

const checkControllerFn = (controllerFn: AnyFunction): void => {
  if (typeof controllerFn !== "function") {
    throw new Error(
      "Param `controllerFn` must be a function. " +
        `Got ${typeof controllerFn} instead`
    );
  }
};

export const wrapController = (
  controllerFn: AnyFunction,
  validationSchemas: ValidationSchemas | undefined = {}
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  checkControllerFn(controllerFn);
  return async (req: Request, res: Response, next: NextFunction) => {
    const controllerArgs = wrapControllerArgs(req);

    try {
      // Validate input, query and params
      if (validationSchemas) {
        const { paramsSchema, inputSchema, querySchema } = validationSchemas;
        const { input, params, query } = controllerArgs;
        try {
          if (inputSchema) JoiValidate(inputSchema, input);
          if (paramsSchema) JoiValidate(paramsSchema, params);
          if (querySchema) JoiValidate(querySchema, query);
        } catch (error: any) {
          throw new RequestValidationError(error.details);
        }
      }

      // Run controller function
      let result = await controllerFn(controllerArgs);
      if (result === undefined) {
        result = { success: true };
      }

      res.status(200).json({ result });
    } catch (err: any) {
      next(err); // pass error to errorMiddleware
    }
  };
};
