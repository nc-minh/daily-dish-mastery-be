import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { adminMiddleware, authMiddleware } from 'middleware/auth';
import { CreateMealRequest } from './dto/CreateMealRequest';
import { UpdateMealParams, UpdateMealRequest } from './dto/UpdateMealRequest';
import { DeleteMealParams } from './dto/DeleteMealParams';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateMealRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createMeal),
);

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateMealRequest, APP_CONSTANTS.body),
  validationMiddleware(UpdateMealParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateMeal),
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(DeleteMealParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteMealById),
);

router.get('/', asyncRouteHandler(controller.getAllMeals));

export default router;
