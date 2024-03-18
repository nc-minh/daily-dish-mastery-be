import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { authMiddleware } from 'middleware/auth';
import { CreateFoodRequest } from './dto/CreateFoodRequest';
import { UpdateFoodParams, UpdateFoodRequest } from './dto/UpdateFoodRequest';
import { DeleteFoodParams } from './dto/DeleteFoodParams';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateFoodRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createFood),
);

router.patch(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateFoodRequest, APP_CONSTANTS.body),
  validationMiddleware(UpdateFoodParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateFood),
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(DeleteFoodParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteFoodById),
);

router.get('/', asyncRouteHandler(controller.getAllFoods));

router.get('/:id', asyncRouteHandler(controller.getFoodById));

router.get('/owner', authMiddleware, asyncRouteHandler(controller.getAllFoods));

export default router;
