import { ErrorCodes, RequestError } from '.'

interface ReturnDetailsParams {
  fields?: Array<{ code: string, path: string }>
}

interface SerializeErrorResult {
  code: string
  httpStatus: number
  message: string
  details: ReturnDetailsParams
}

export const serializeError = (err: Error): SerializeErrorResult => {
  let httpStatus = 500
  let code = ErrorCodes.INTERNAL_SERVER_ERROR
  let message = 'Something went wrong'
  let details = {}

  if (err instanceof RequestError) {
    httpStatus = err.status
    code = err.errorCode
    message = err.message
    details = err.details ?? {}
  }

  return {
    code,
    httpStatus,
    message,
    details
  }
}
