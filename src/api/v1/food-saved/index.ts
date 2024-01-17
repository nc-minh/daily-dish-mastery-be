import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { authMiddleware } from 'middleware/auth';
import { CreateFoodSavedRequest } from './dto/CreateFoodSavedRequest';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateFoodSavedRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.saveOrRemoveFoodSaved),
);

router.get('/', authMiddleware, asyncRouteHandler(controller.getAllFoodSaved));

export default router;
