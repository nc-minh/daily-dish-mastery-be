import { Router } from 'express';

import userRouter from './user';
import authRouter from './auth';
import categoryRouter from './category';
import uploadRouter from './upload';
import foodRouter from './food';
import mealRouter from './meal';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/upload', uploadRouter);
router.use('/foods', foodRouter);
router.use('/meals', mealRouter);

export default router;
