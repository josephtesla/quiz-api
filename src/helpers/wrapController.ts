import { Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { ObjectSchema } from 'joi'
import { AnyFunction, validate } from '.'
import { RequestValidationError } from './error'
// import { StateAttributes } from '../middleware'

export interface WrapperArguments {
  input: any
  params: any
  query: any
  state: any
  headers: IncomingHttpHeaders
}

export interface ValidationSchemas {
  paramsSchema: ObjectSchema,
  inputSchema: ObjectSchema
}

const wrapControllerArgs = (req: Request): WrapperArguments => ({
  input: req.body,
  params: req.params,
  query: req.query,
  state: req.state,
  headers: req.headers,
})

const checkControllerFn = (controllerFn: AnyFunction): void => {
  if (typeof controllerFn !== 'function') {
    throw new Error(
      'Param `controllerFn` must be a function. ' +
        `Got ${typeof controllerFn} instead`
    )
  }
}

export const wrapController = (
  controllerFn: AnyFunction,
  validationSchemas: ValidationSchemas
): ((req: Request, res: Response) => Promise<void>) => {
  checkControllerFn(controllerFn)
  return async (req: Request, res: Response) => {
    const controllerArgs = wrapControllerArgs(req)

    // Validate input and params
    const { paramsSchema, inputSchema } = validationSchemas
    const { input, params } = controllerArgs
    try {
      validate(inputSchema, input)
      validate(paramsSchema, params)
    } catch (error: any) {
      throw new RequestValidationError(error.details)
    }

    // Run controller function
    let result = await controllerFn(controllerArgs)
    if (result === undefined) {
      result = { success: true } 
    }

    res.status(200).json({ result })
  }
}
