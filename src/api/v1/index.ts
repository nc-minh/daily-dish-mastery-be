import { Router } from 'express';

import userRouter from './user';
import authRouter from './auth';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
