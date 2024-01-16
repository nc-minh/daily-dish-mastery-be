import { Response as ExpressResponse } from 'express';

import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import fmt from 'utils/rest/formatter';
import { CreateMealRequest } from './dto/CreateMealRequest';
import { UpdateMealParams, UpdateMealRequest } from './dto/UpdateMealRequest';
import { DeleteMealParams } from './dto/DeleteMealParams';
import URLParams from 'types/rest/URLParams';

export const createMeal = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateMealRequest = request.body;

  const result = await service.createMeal(input, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const updateMeal = async (request: AppRequest, response: ExpressResponse) => {
  const input: UpdateMealRequest = request.body;
  const params: UpdateMealParams = request.params;

  const result = await service.updateMeal(input, params, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const deleteMealById = async (request: AppRequest, response: ExpressResponse) => {
  const params: DeleteMealParams = request.params;

  const result = await service.deleteMealById(params.id, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllMeals = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;

  const { result, meta } = await service.getAllMeals(urlParams);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
      currentPage: meta.currentPage,
      pageSize: meta.pageSize,
      total: meta.total,
    }),
  );
};
