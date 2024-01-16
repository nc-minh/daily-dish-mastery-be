import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { authMiddleware } from 'middleware/auth';
import { CreateFoodCommentRequest } from './dto/CreateFoodCommentRequest';
import { UpdateFoodCommentParams, UpdateFoodCommentRequest } from './dto/UpdateFoodCommentRequest';
import { DeleteFoodCommentParams } from './dto/DeleteFoodCommentParams';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateFoodCommentRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createFoodComment),
);

router.patch(
  '/:id',
  authMiddleware,
  validationMiddleware(UpdateFoodCommentRequest, APP_CONSTANTS.body),
  validationMiddleware(UpdateFoodCommentParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.updateFoodComment),
);

router.delete(
  '/:id',
  authMiddleware,
  validationMiddleware(DeleteFoodCommentParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteFoodCommentById),
);

router.get('/', authMiddleware, asyncRouteHandler(controller.getAllFoodComments));

export default router;
