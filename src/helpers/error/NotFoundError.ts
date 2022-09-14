import { ErrorCodes, RequestError } from '.'

export class NotFoundError extends RequestError {
  _status = 404
  _errorCode = ErrorCodes.NOT_FOUND
  _message: string
  _details = null

  constructor (message: string) {
    message = message ?? "Not Found"
    super(message)

    this._message = message
    Object.setPrototypeOf(this, NotFoundError.prototype)
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
