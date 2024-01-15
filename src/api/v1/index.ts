import { Router } from 'express';

import userRouter from './user';
import authRouter from './auth';
import categoryRouter from './category';
import uploadRouter from './upload';
import foodRouter from './food';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/upload', uploadRouter);
router.use('/foods', foodRouter);

export default router;
