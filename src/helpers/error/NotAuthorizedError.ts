import { ErrorCodes, RequestError } from '.'

export class NotAuthorizedError extends RequestError {
  _status = 403
  _errorCode = ErrorCodes.NOT_AUTHORIZED
  _message: string
  _details = null

  constructor () {
    super('Not authorized')

    this._message = 'Not authorized'
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
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
