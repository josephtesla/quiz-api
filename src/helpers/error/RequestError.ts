export interface DetailsParams {
  fields: Array<{ code: string, path: string }>
}

export abstract class RequestError extends Error {
  abstract _status: number
  abstract _errorCode: string
  abstract _message: string
  abstract _details: null | DetailsParams

  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, RequestError.prototype)
  }

  abstract get status (): number
  abstract get errorCode (): string
  abstract get message (): string
  abstract get details (): null | DetailsParams
}
