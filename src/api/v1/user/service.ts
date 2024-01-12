import UserModel from 'models/schemas/User';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { ERROR_CODES, ErrorCodes, HTTP_RESPONSE_STATUS_CODES, USER_ERROR_CODES } from 'exceptions/errorCode';
import HttpException from 'exceptions/HttpException';

export const createUser = async (input: CreateUserRequest) => {
  try {
    const user = await UserModel.create(input);

    return user;
  } catch (error) {
    if (error?.code === ERROR_CODES.MONGODB_DUPLICATED_CODE) {
      throw new HttpException(
        HTTP_RESPONSE_STATUS_CODES.DUPLICATE_DATA,
        USER_ERROR_CODES.DUPLICATE_USER.MESSAGE,
        USER_ERROR_CODES.DUPLICATE_USER.CODE,
      );
    }

    throw new HttpException(
      HTTP_RESPONSE_STATUS_CODES.BAD_REQUEST,
      ErrorCodes.BAD_REQUEST.MESSAGE,
      ErrorCodes.BAD_REQUEST.CODE,
    );
  }
};
