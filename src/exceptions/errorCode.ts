export interface CustomError {
  CODE: string;
  MESSAGE: string;
}

export const ERROR_CODES = {
  MONGODB_DUPLICATED_CODE: 11000,
};

export const ErrorCodes: { [key: string]: CustomError } = {
  BAD_REQUEST: {
    CODE: 'BAD_REQUEST',
    MESSAGE: 'Bad request',
  },
  VALIDATION_ERROR: {
    CODE: 'VALIDATION_ERROR',
    MESSAGE: 'Validation failed error',
  },
};

export const USER_ERROR_CODES = {
  DUPLICATE_USER: {
    CODE: 'DUPLICATE_USER',
    MESSAGE: 'Account already exists',
  },
  USER_NOT_FOUND: {
    CODE: 'USER_NOT_FOUND',
    MESSAGE: 'User not found',
  },
};

export const AUTH_ERROR_CODES = {
  UNAUTHORIZED: {
    CODE: 'AUTHENTICATION_ERROR',
    MESSAGE: 'The user provided an incorrect password',
  },
  JWT_EXCEPTION: {
    CODE: 'JWT_EXCEPTION',
    MESSAGE: 'Jwt exception',
  },
  JWT_REFRESH_TOKEN_EXPIRED: {
    CODE: 'JWT_REFRESH_TOKEN_EXPIRED',
    MESSAGE: 'Refresh token expired',
  },
  JWT_ACCESS_TOKEN_EXPIRED: {
    CODE: 'JWT_ACCESS_TOKEN_EXPIRED',
    MESSAGE: 'Access token expired',
  },
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export const HTTP_RESPONSE_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  DUPLICATE_DATA: 409,
};
