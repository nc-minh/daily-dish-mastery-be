import { Response as ExpressResponse } from 'express';

import fmt from 'utils/rest/formatter';
import AppRequest from 'types/rest/AppRequest';
import * as service from './service';
import { CreateUserRequest } from './dto/CreateUserRequest';

export const createUser = async (request: AppRequest, response: ExpressResponse) => {
  const input: CreateUserRequest = request.body;

  const result = await service.createUser(input);

  response.send(
    fmt.formatResponse({
      result,
      time: Date.now() - request.startTime,
      message: 'OK',
    }),
  );
};
