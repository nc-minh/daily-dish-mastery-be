import { ValidationError } from 'class-validator';

import { APP_CONSTANTS } from 'constants/app';
import { ErrorCodes, HTTP_RESPONSE_STATUS_CODES } from './errorCode';

class HttpException extends Error {
  public status: number;

  public message: string;

  public errorCode: string;

  public service: string;

  public validationErrors: ValidationError[];

  constructor(status: number, message: string, errorCode: string, validationErrors?: ValidationError[]) {
    super(message);
    this.status = status || HTTP_RESPONSE_STATUS_CODES.BAD_REQUEST;
    this.message = message || ErrorCodes.BAD_REQUEST.MESSAGE;
    this.errorCode = errorCode || ErrorCodes.BAD_REQUEST.CODE;
    this.service = APP_CONSTANTS.service;
    this.validationErrors = validationErrors;
  }
}

export default HttpException;
