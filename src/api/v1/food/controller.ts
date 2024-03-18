import { Response as ExpressResponse } from 'express';

import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import { CreateFoodRequest } from './dto/CreateFoodRequest';
import fmt from 'utils/rest/formatter';
import { UpdateFoodParams, UpdateFoodRequest } from './dto/UpdateFoodRequest';
import { DeleteFoodParams } from './dto/DeleteFoodParams';
import URLParams from 'types/rest/URLParams';
import { GetFoodParams } from './dto/GetFoodParams';
import { GetFoodQuery } from './dto/GetFoodQuery';

export const createFood = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateFoodRequest = request.body;

  const result = await service.createFood(input, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const updateFood = async (request: AppRequest, response: ExpressResponse) => {
  const input: UpdateFoodRequest = request.body;
  const params: UpdateFoodParams = request.params;

  const result = await service.updateFood(input, params, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const deleteFoodById = async (request: AppRequest, response: ExpressResponse) => {
  const params: DeleteFoodParams = request.params;

  const result = await service.deleteFoodById(params.id, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllFoods = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;
  const query: GetFoodQuery = request.query;

  const { result, meta } = await service.getAllFoods(query, urlParams);

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

export const getFoodById = async (request: AppRequest, response: ExpressResponse) => {
  const params: GetFoodParams = request.params;

  const result = await service.getFoodById(params.id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllFoodsByOwner = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;
  const query: GetFoodQuery = request.query;

  const { result, meta } = await service.getAllFoodsByOwner(query, urlParams, request.user._id);

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
