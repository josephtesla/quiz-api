import { ErrorCodes, RequestError } from '.'

export class BadRequestError extends RequestError {
  _status = 400
  _errorCode = ErrorCodes.INVALID_INPUT
  _message: string
  _details = null

  constructor (message: string) {
    super(message)
    this._message = message

    Object.setPrototypeOf(this, BadRequestError.prototype)
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
