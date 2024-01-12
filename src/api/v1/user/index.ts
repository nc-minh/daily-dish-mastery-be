import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { CreateUserRequest } from './dto/CreateUserRequest';
import { APP_CONSTANTS } from 'constants/app';

const router = Router();

router.post('/', validationMiddleware(CreateUserRequest, APP_CONSTANTS.body), asyncRouteHandler(controller.createUser));

export default router;
