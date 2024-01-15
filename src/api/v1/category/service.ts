import BadRequestException from 'exceptions/BadRequestException';
import CategoryModel from 'models/schemas/Category';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';
import { ObjectId } from 'mongoose';
import { UpdateCategoryParams, UpdateCategoryRequest } from './dto/UpdateCategoryRequest';
import URLParams from 'types/rest/URLParams';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';

export const createCategory = async (input: CreateCategoryRequest, author: ObjectId) => {
  try {
    const category = await CategoryModel.create({
      ...input,
      created_by: author,
    });

    return category;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const deleteCategoryById = async (categoryId: string) => {
  try {
    const category = await CategoryModel.deleteOne({ _id: categoryId });

    return category;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const updateCategoryById = async (
  input: UpdateCategoryRequest,
  params: UpdateCategoryParams,
  author: ObjectId,
) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      { _id: params.id },
      {
        $set: input,
        updated_by: author,
      },
    );

    return category;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllCategories = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const count = CategoryModel.countDocuments();
    const data = CategoryModel.find()
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj);

    const resolveAll = await Promise.all([count, data]);

    return {
      result: resolveAll[1],
      meta: {
        total: resolveAll[0],
        pageSize,
        currentPage,
      },
    };
  } catch (error) {
    throw new BadRequestException();
  }
};
