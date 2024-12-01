import express from 'express';
import { transactionRouter } from './transaction-routes.js';
import { userRouter } from './user-routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);

export {router as apiRoutes};