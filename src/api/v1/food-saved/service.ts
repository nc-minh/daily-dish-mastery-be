import BadRequestException from 'exceptions/BadRequestException';
import { ObjectId } from 'mongoose';

import FoodSavedModel from 'models/schemas/FoodSaved';
import { CreateFoodSavedRequest } from './dto/CreateFoodSavedRequest';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';
import URLParams from 'types/rest/URLParams';
import populateUser from 'utils/user/populateUser';
import FoodModel from 'models/schemas/Food';
import NotFoundException from 'exceptions/NotFoundException';

export const saveOrRemoveFoodSaved = async (input: CreateFoodSavedRequest, author: ObjectId) => {
  try {
    const food = await FoodModel.findById({ _id: input.foods_id });
    if (!food) {
      return new NotFoundException();
    }

    const foodSaved = await FoodSavedModel.findOne({
      foods_id: input.foods_id,
      created_by: author,
    });

    if (foodSaved) {
      return await FoodSavedModel.findOneAndDelete({ _id: foodSaved._id });
    }

    return await FoodSavedModel.create({ ...input, created_by: author });
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllFoodSaved = async (author: ObjectId, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };

    const query = {
      created_by: author,
    };

    const count = FoodSavedModel.countDocuments(query);
    const data = FoodSavedModel.find(query)
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj)
      .populate('created_by', populateUser())
      .populate('foods_id');

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
