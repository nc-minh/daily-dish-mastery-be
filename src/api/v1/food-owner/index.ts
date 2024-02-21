import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { GetFoodQuery } from './dto/GetFoodQuery';
import { APP_CONSTANTS } from 'constants/app';
import { authMiddleware } from 'middleware/auth';

const router = Router();

router.get(
  '/',
  authMiddleware,
  validationMiddleware(GetFoodQuery, APP_CONSTANTS.query),
  asyncRouteHandler(controller.getAllFoodsByOwner),
);

export default router;
