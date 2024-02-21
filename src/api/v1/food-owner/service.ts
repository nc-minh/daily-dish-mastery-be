import BadRequestException from 'exceptions/BadRequestException';
import FoodModel from 'models/schemas/Food';
import { DEFAULT_PAGING } from 'constants/app';
import { SortOrder } from 'constants/urlparams';
import URLParams from 'types/rest/URLParams';
import populateUser from 'utils/user/populateUser';
import { GetFoodQuery } from './dto/GetFoodQuery';
import { ObjectId } from 'mongoose';

export const getAllFoodsByOwner = async (getAllFoodsQuery: GetFoodQuery, urlParams: URLParams, author: ObjectId) => {
  try {
    const pageSize = urlParams.pageSize || DEFAULT_PAGING.limit;
    const currentPage = urlParams.currentPage || DEFAULT_PAGING.skip;
    const order = urlParams.order || SortOrder.DESC;
    const sort = urlParams.sort || 'created_at';
    const sortObj: any = { [sort]: order === 'DESC' ? -1 : 1 };
    const q = urlParams.q || '';

    const { category_id, is_approved } = getAllFoodsQuery;

    let query = {
      created_by: author,
    } as any;

    if (q) {
      // Only perform the search if the search term is not empty
      query = { $text: { $search: q } };
    }

    if (category_id) query.category_id = category_id;
    if (is_approved) query.is_approved = is_approved;

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
