import UserModel from 'models/schemas/User';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { ERROR_CODES } from 'exceptions/errorCode';
import DuplicateUserException from 'exceptions/DuplicateUserException';
import BadRequestException from 'exceptions/BadRequestException';

export const createUser = async (input: CreateUserRequest) => {
  try {
    const user = await UserModel.create(input);

    return user;
  } catch (error) {
    if (error?.code === ERROR_CODES.MONGODB_DUPLICATED_CODE) {
      throw new DuplicateUserException();
    }

    throw new BadRequestException();
  }
};
