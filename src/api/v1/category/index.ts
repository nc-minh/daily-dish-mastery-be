import { Router } from 'express';

import * as controller from './controller';
import { asyncRouteHandler } from 'middleware/asyncRoute';
import { validationMiddleware } from 'middleware/validation';
import { APP_CONSTANTS } from 'constants/app';
import { CreateCategoryRequest } from './dto/CreateCategoryRequest';
import { adminMiddleware, authMiddleware } from 'middleware/auth';

const router = Router();

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(CreateCategoryRequest, APP_CONSTANTS.body),
  asyncRouteHandler(controller.createCategory),
);

export default router;
