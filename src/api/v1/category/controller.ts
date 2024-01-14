import { Response as ExpressResponse } from 'express';

import fmt from 'utils/rest/formatter';
import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';

export const createCategory = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateCategoryRequest = request.body;

  input.created_by = request?.user?._id;
  input.updated_by = request?.user?._id;

  const result = await service.createCategory(input);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};
