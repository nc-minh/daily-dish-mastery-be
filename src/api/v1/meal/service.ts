import BadRequestException from 'exceptions/BadRequestException';
import MealModel from 'models/schemas/Meal';
import { ObjectId } from 'mongoose';
import { CreateMealRequest } from './dto/CreateMealRequest';
import { UpdateMealParams, UpdateMealRequest } from './dto/UpdateMealRequest';
import populateUser from 'utils/user/populateUser';
import { DEFAULT_PAGING } from 'constants/app';
import URLParams from 'types/rest/URLParams';
import { SortOrder } from 'constants/urlparams';
import AccessDeniedException from 'exceptions/AccessDeniedException';
import NotFoundException from 'exceptions/NotFoundException';

export const createMeal = async (input: CreateMealRequest, author: ObjectId) => {
  try {
    const meal = await MealModel.create({ ...input, created_by: author });

    return meal;
  } catch (error) {
    throw new BadRequestException();
  }
};

export const updateMeal = async (input: UpdateMealRequest, params: UpdateMealParams, author: ObjectId) => {
  try {
    const meal = await MealModel.findById({ _id: params.id });

    if (!meal) {
      return new NotFoundException();
    }

    if (String(meal?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await MealModel.findByIdAndUpdate(
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

export const deleteMealById = async (foodId: string, author: ObjectId) => {
  try {
    const meal = await MealModel.findById({ _id: foodId });

    if (!meal) {
      return new NotFoundException();
    }

    if (String(meal?.created_by) !== String(author)) {
      return new AccessDeniedException();
    }

    return await MealModel.findOneAndDelete({ _id: foodId });
  } catch (error) {
    throw new BadRequestException();
  }
};

export const getAllMeals = async (urlParams: URLParams) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };
    const q = urlParams.q || '';

    let query = {} as any;

    if (q) {
      // Only perform the search if the search term is not empty
      query = { $text: { $search: q } };
    }

    const count = MealModel.countDocuments(query);
    const data = MealModel.find(query)
      .skip(pageSize * currentPage)
      .limit(pageSize)
      .sort(sortObj)
      .populate('created_by', populateUser())
      .populate('foods');

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
    console.log(error);

    throw new BadRequestException();
  }
};
