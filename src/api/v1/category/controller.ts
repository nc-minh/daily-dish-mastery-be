import { Response as ExpressResponse } from 'express';

import fmt from 'utils/rest/formatter';
import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';
import { UpdateCategoryParams, UpdateCategoryRequest } from './dto/UpdateCategoryRequest';
import { DeleteCategoryParams } from './dto/DeleteCategoryParams';
import URLParams from 'types/rest/URLParams';

export const createCategory = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateCategoryRequest = request.body;

  const result = await service.createCategory(input, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const deleteCategoryById = async (request: AppRequest, response: ExpressResponse) => {
  const params: DeleteCategoryParams = request.params;

  const result = await service.deleteCategoryById(params.id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const updateCategoryById = async (request: AppRequest, response: ExpressResponse) => {
  const input: UpdateCategoryRequest = request.body;
  const params: UpdateCategoryParams = request.params;

  const result = await service.updateCategoryById(input, params, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllCategories = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;

  const { result, meta } = await service.getAllCategories(urlParams);

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
