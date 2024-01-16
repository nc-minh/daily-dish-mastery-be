import BadRequestException from 'exceptions/BadRequestException';
import { ObjectId } from 'mongoose';

import FoodCommentModel from 'models/schemas/FoodComment';
import { CreateFoodCommentRequest } from './dto/CreateFoodCommentRequest';
import NotFoundException from 'exceptions/NotFoundException';
import AccessDeniedException from 'exceptions/AccessDeniedException';
import { UpdateFoodCommentParams, UpdateFoodCommentRequest } from './dto/UpdateFoodCommentRequest';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';
import populateUser from 'utils/user/populateUser';
import URLParams from 'types/rest/URLParams';
import { GetFoodCommentQuery } from './dto/GetFoodCommentQuery';
import FoodModel from 'models/schemas/Food';
import convertStringToObjectId from 'utils/mongodb/convertStringToObjectId';

export const createFoodComment = async (input: CreateFoodCommentRequest, author: ObjectId) => {
  try {
    const food = await FoodModel.findById({ _id: input.foods_id });
    if (!food) {
      return new NotFoundException();
    }

    const foodComment = await FoodCommentModel.create({ ...input, created_by: author });

    return foodComment;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const updateFoodComment = async (
  input: UpdateFoodCommentRequest,
  params: UpdateFoodCommentParams,
  author: ObjectId,
) => {
  try {
    const foodComment = await FoodCommentModel.findById({ _id: params.id });

    if (!foodComment) {
      return new NotFoundException();
    }

    if (String(foodComment?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await FoodCommentModel.findByIdAndUpdate(
      { _id: params.id },
      {
        $set: input,
        updated_by: author,
      },
    );
  } catch (error) {
    throw new BadRequestException();
  }
};

export const deleteFoodCommentById = async (foodCommentId: string, author: ObjectId) => {
  try {
    const res = await FoodCommentModel.findById({ _id: foodCommentId });

    if (!res) {
      return new NotFoundException();
    }

    if (String(res?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await FoodCommentModel.deleteOne({ _id: foodCommentId });
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllFoodComments = async (getAllFoodCommentsQuery: GetFoodCommentQuery, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const { foods_id } = getAllFoodCommentsQuery;

    let query = {} as any;

    if (foods_id) query.foods_id = convertStringToObjectId(foods_id);

    const count = FoodCommentModel.countDocuments(query);
    const data = FoodCommentModel.find(query)
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj)
      .populate('created_by', populateUser());

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
