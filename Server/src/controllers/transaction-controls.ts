import { Request, Response } from 'express';
import { User } from '../Models/user.js';
import { Transaction } from '../Models/transaction.js';



export const getAllUserTransactions = async (req: Request, res: Response) => {
    const id  = req.params.userId;
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
    const id: string = req.params.userId;
    
    const { amount, date, description } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            const transaction = await Transaction.create({
                amount: amount,
                date: date,
                description: description,
                userId: id,
            });
            res.json(transaction);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        console.log(amount, Date, description);
        res.status(500).json({ message: err.message });
    }
};



export const updateTransaction = async (req: Request, res: Response) => {
    const transactionId  = req.body.transactionId;
    const userId  = req.params.userId
    const { amount, date, description } = req.body;
    try {
        const transaction = await Transaction.findOne(
            { where: { 
                transactionId: transactionId,
                userId: userId,
            }});

        if (!transaction) {
        res.status(404).json({ message: `Transaction ${transactionId} could not be found.`});
        return;
    } 
    console.log('Fetched transaction:', transaction);
        transaction.transactionId = transactionId;
        transaction.amount = amount;
        transaction.date = date;
        transaction.description = description;
        await transaction.save();
        res.json(transaction);
    } catch (err: any) {
        
        res.status(500).json({ message: err.message });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const transactionId  = req.params.transactionId;
    const userId = req.params.userId;
    try {
        const deletedCount = await Transaction.destroy(
            { where: 
                { 
                    transactionId: transactionId,
                    userId: userId,
                }
            }
        );
        if (deletedCount > 0) {
            console.log(`Transaction ${transactionId} was deleted.`);
            res.status(200).json({ message: `Transaction ${transactionId} deleted succesfully.`});
        } else {
            console.log(`Transaction ${transactionId} was not found or could not be deleted.`);
            res.status(404).json({ message: `Transaction ${transactionId} not found.`});
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};