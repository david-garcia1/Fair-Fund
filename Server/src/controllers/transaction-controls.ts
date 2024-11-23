import { Request, Response } from 'express';
import { User } from '../Models/user.js';
import { Transaction } from '../Models/transaction.js';

export const getAllUserTransactions = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            const transactions = await Transaction.findAll({
                where: { userId: id}
            });
            res.json(transactions);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount, expense } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            const transaction = await Transaction.create({
                amount: amount,
                expense: expense,
                userId: id,
            });
            res.json(transaction);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const { newAmount } = req.body;
    try {
        const [updatedTransaction] = await Transaction.update(
            { amount: newAmount },
            { where: { transactionId: transactionId } }
        );
        if (updatedTransaction === 0) {
            console.log('This transaction could not be updated.');
        } else {
            console.log(`Transaction ${transactionId} updated successfully.`);
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    try {
        const targetTransaction = await Transaction.destroy(
            { where: { transactionId: transactionId } }
        );
        if (targetTransaction) {
            console.log(`Transaction ${transactionId} was not able to be delected.`);
        } else {
            console.log(`Transaction ${transactionId} was deleted.`);
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};