import BadRequestException from 'exceptions/BadRequestException';
import CategoryModel from 'models/schemas/Category';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';

export const createCategory = async (input: CreateCategoryRequest) => {
  try {
    const category = await CategoryModel.create(input);

    return category;
  } catch (error) {
    throw new BadRequestException();
  }
};
