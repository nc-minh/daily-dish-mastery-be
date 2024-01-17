import { Response as ExpressResponse } from 'express';

import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import fmt from 'utils/rest/formatter';
import { CreateFoodSavedRequest } from './dto/CreateFoodSavedRequest';
import URLParams from 'types/rest/URLParams';

export const saveOrRemoveFoodSaved = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateFoodSavedRequest = request.body;

  const result = await service.saveOrRemoveFoodSaved(input, request.user._id);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};

export const getAllFoodSaved = async (request: AppRequest, response: ExpressResponse) => {
  const urlParams: URLParams = request.searchParams;

  const { result, meta } = await service.getAllFoodSaved(request.user._id, urlParams);

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
