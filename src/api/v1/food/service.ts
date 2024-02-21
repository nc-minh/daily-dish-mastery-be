import BadRequestException from 'exceptions/BadRequestException';
import FoodModel from 'models/schemas/Food';
import { CreateFoodRequest } from './dto/CreateFoodRequest';
import { ObjectId } from 'mongoose';
import { UpdateFoodParams, UpdateFoodRequest } from './dto/UpdateFoodRequest';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';
import URLParams from 'types/rest/URLParams';
import populateUser from 'utils/user/populateUser';
import { GetFoodQuery } from './dto/GetFoodQuery';
import AccessDeniedException from 'exceptions/AccessDeniedException';
import NotFoundException from 'exceptions/NotFoundException';

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
    const res = await FoodModel.findById({ _id: params.id });

    if (!res) {
      return new NotFoundException();
    }

    if (String(res?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await FoodModel.findByIdAndUpdate(
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

export const deleteFoodById = async (foodId: string, author: ObjectId) => {
  try {
    const res = await FoodModel.findById({ _id: foodId });

    if (!res) {
      return new NotFoundException();
    }

    if (String(res?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await FoodModel.deleteOne({ _id: foodId });
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllFoods = async (getAllFoodsQuery: GetFoodQuery, urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };
    const q = urlParams.q || '';

    const { category_id, user_id } = getAllFoodsQuery;

    let query = {
      is_approved: true,
    } as any;

    if (q) {
      // Only perform the search if the search term is not empty
      query = { $text: { $search: q } };
    }

    if (category_id) query.category_id = category_id;
    if (user_id) query.created_by = user_id;

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
    const filter = { _id: foodId, is_approved: true };

    const res = await FoodModel.findByIdAndUpdate(filter, { $inc: { view_count: 1 } })
      .populate('created_by', populateUser())
      .populate('category_id');

    return res;
  } catch (error) {
    throw new BadRequestException();
  }
};
