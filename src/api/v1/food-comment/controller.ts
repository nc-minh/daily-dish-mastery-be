import { Response as ExpressResponse } from 'express';

import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import fmt from 'utils/rest/formatter';
import { CreateFoodCommentRequest } from './dto/CreateFoodCommentRequest';
import { UpdateFoodCommentParams, UpdateFoodCommentRequest } from './dto/UpdateFoodCommentRequest';
import { DeleteFoodCommentParams } from './dto/DeleteFoodCommentParams';
import URLParams from 'types/rest/URLParams';
import { GetFoodCommentQuery } from './dto/GetFoodCommentQuery';

export const createFoodComment = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateFoodCommentRequest = request.body;

  const result = await service.createFoodComment(input, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const updateFoodComment = async (request: AppRequest, response: ExpressResponse) => {
  const input: UpdateFoodCommentRequest = request.body;
  const params: UpdateFoodCommentParams = request.params;

  const result = await service.updateFoodComment(input, params, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const deleteFoodCommentById = async (request: AppRequest, response: ExpressResponse) => {
  const params: DeleteFoodCommentParams = request.params;

  const result = await service.deleteFoodCommentById(params.id, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllFoodComments = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;
  const query: GetFoodCommentQuery = request.query;

  const { result, meta } = await service.getAllFoodComments(query, urlParams);

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
