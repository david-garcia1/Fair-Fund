import { Router } from 'express';
import { transactionRouter } from './transaction-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);

export default router;