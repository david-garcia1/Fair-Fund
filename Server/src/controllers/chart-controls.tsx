import { Op } from 'sequelize';
import { Transaction } from '../Models/transaction.js';
import { Request, Response } from 'express';
import { User } from '../Models/user.js';

const calculateStartDate = (timeframe: string) => {
    const now = new Date();
    if (timeframe === 'Week') {
        return new Date(now.setDate(now.getDate() - 7));
    } else if (timeframe === 'Month') {
        return new Date(now.setMonth(now.getMonth() - 1));
    } else if (timeframe === 'YTD') {
        return new Date(new Date().getFullYear(), 0, 1);
    }
    return
};



export const getTransactionsByTimeFrame = async (req: Request, res: Response) => {
    const { userId, timeframe } = req.params;

    try {
        const startDate = calculateStartDate(timeframe);
        const endDate = new Date();

        const user = await User.findByPk(userId);
        if (user) {
            const transactions = await Transaction.findAll(
                {
                    where: {
                        userId: userId,
                        date: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate,
                        },
                    }
                },
            );
            res.json(transactions);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

