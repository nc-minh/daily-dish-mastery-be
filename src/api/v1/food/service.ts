import BadRequestException from 'exceptions/BadRequestException';
import FoodModel from 'models/schemas/Food';
import { CreateFoodRequest } from './dto/CreateFoodRequest';
import { ObjectId } from 'mongoose';
import { UpdateFoodParams, UpdateFoodRequest } from './dto/UpdateFoodRequest';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';
import URLParams from 'types/rest/URLParams';
import populateUser from 'utils/user/populateUser';

export const createFood = async (input: CreateFoodRequest, author: ObjectId) => {
  try {
    const food = await FoodModel.create({ ...input, created_by: author });

    return food;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const updateFood = async (input: UpdateFoodRequest, params: UpdateFoodParams, author: ObjectId) => {
  try {
    const food = await FoodModel.findByIdAndUpdate(
      { _id: params.id },
      {
        $set: input,
        updated_by: author,
      },
    );

    return food;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const deleteFoodById = async (foodId: string) => {
  try {
    const category = await FoodModel.deleteOne({ _id: foodId });

    return category;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllFoods = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };
    const q = urlParams.q || '';

    let query = {
      is_approved: true,
    } as any;

    if (q) {
      // Only perform the search if the search term is not empty
      query = { $text: { $search: q } };
    }

    const count = FoodModel.countDocuments(query);
    const data = FoodModel.find(query)
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj)
      .populate('created_by', populateUser())
      .populate('category_id');

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

export const getFoodById = async (foodId: string) => {
  try {
    const food = FoodModel.findOne({ _id: foodId, is_approved: true })
      .populate('created_by', populateUser())
      .populate('category_id');

    return await food;
  } catch (error) {
    throw new BadRequestException();
  }
};
