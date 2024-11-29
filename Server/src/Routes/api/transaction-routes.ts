import express from 'express';
import {
    getAllUserTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from '../../controllers/transaction-controls.js';
import { getTransactionsByTimeFrame } from '../../controllers/chart-controls.js';


const router = express.Router();

router.get('/:userId', getAllUserTransactions);
router.post('/:userId/', createTransaction);
router.put('/:userId/:transactionId', updateTransaction);
router.delete('/:userId/:transactionId', deleteTransaction);
router.get('/:userId/:timeframe', getTransactionsByTimeFrame);

export { router as transactionRouter };