import { Router } from 'express';

import userRouter from './user';
import authRouter from './auth';
import categoryRouter from './category';
import uploadRouter from './upload';
import foodRouter from './food';
import mealRouter from './meal';
import foodCommentRouter from './food-comment';
import foodSavedRouter from './food-saved';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/upload', uploadRouter);
router.use('/foods', foodRouter);
router.use('/meals', mealRouter);
router.use('/food-comments', foodCommentRouter);
router.use('/food-saved', foodSavedRouter);

export default router;
