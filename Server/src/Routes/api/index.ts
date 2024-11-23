import { Router } from 'express';
import { transactionRouter } from './transaction-routes.js';

const router = Router();

router.use('/transactions', transactionRouter);

export default router;