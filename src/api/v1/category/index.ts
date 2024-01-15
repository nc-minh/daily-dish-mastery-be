import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';
import { adminMiddleware, authMiddleware } from 'middleware/auth';
import { DeleteCategoryParams } from './dto/DeleteCategoryParams';
import { UpdateCategoryParams, UpdateCategoryRequest } from './dto/UpdateCategoryRequest';

const router = Router();

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(CreateCategoryRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createCategory),
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(DeleteCategoryParams, APP_CONSTANTS.params),
  asyncRouteHandler(controller.deleteCategoryById),
);

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateCategoryParams, APP_CONSTANTS.params),
  validationMiddleware(UpdateCategoryRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.updateCategoryById),
);

router.get('/', asyncRouteHandler(controller.getAllCategories));

export default router;
