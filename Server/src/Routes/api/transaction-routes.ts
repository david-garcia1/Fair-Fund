import express from 'express';
import {
    getAllUserTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from '../../controllers/transaction-controls.js';


const router = express.Router();

router.get('/', getAllUserTransactions);
router.post('/:id', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export { router as transactionRouter };