import express from 'express';
import { transactionRouter } from './transaction-routes.js';
import { userRouter } from './user-routes.js';
import { cardRouter } from './card-routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/saved-cards', cardRouter)

export {router as apiRoutes};