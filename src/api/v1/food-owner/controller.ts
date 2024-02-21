import { Response as ExpressResponse } from 'express';

import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import fmt from 'utils/rest/formatter';
import URLParams from 'types/rest/URLParams';
import { GetFoodQuery } from './dto/GetFoodQuery';

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
