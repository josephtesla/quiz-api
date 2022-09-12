import { ErrorCodes, RequestError } from '.'

export class NotAuthenticatedError extends RequestError {
  _status = 401
  _errorCode = ErrorCodes.NOT_AUTHENTICATED
  _message: string
  _details = null

  constructor () {
    super('Not authenticated')

    this._message = 'Not authenticated'
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype)
  }

  get status (): number {
    return this._status
  }

  get errorCode (): string {
    return this._errorCode
  }

  get message (): string {
    return this._message
  }

  get details (): null {
    return this._details
  }
}
