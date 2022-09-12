import { ErrorCodes, FieldErrorCodes, RequestError } from '.'
import { DetailsParams } from './RequestError'

interface ValidationErrorsParams {
  path: string[]
  type: string
}

interface ValidationResult {
  code: string
  path: string
}

const parseValidationErrors = (validationErrors: ValidationErrorsParams[]): ValidationResult[] => {
  return validationErrors.map(({ path, type }) => {
    let fieldErrorCode = FieldErrorCodes.INVALID_VALUE
    if (type === 'any.required') {
      fieldErrorCode = FieldErrorCodes.MISSING_VALUE
    }

    return {
      code: fieldErrorCode,
      path: path.join('.')
    }
  })
}

export class RequestValidationError extends RequestError {
  _status = 400
  _errorCode = ErrorCodes.INVALID_INPUT
  _message: string
  _details: DetailsParams

  constructor (validationErrors: ValidationErrorsParams[]) {
    super('Provided input is not valid')

    this._message = 'Provided input is not valid'
    this._details = {
      fields: parseValidationErrors(validationErrors)
    }
    Object.setPrototypeOf(this, RequestValidationError.prototype)
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

  get details (): DetailsParams {
    return this._details
  }
}
