import  { SavedCard } from "../Models/savedcard.js";
import { Request, Response } from 'express';


export const saveCards = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { cards } = req.body;
    try {
        await SavedCard.destroy({ where: { userId } });
        const newCards = cards.map((card: any) => ({ ...card, userId}));
        await SavedCard.bulkCreate(newCards);
        res.status(200).json({ message: 'Cards saved successfully!'});
    } catch (err) {
        res.status(500).json({ message: 'failed to save cards', err});
    }
    };

export const fetchCards = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const savedCards = await SavedCard.findAll({ where: { userId } });
        res.json(savedCards);
    } catch (error) {
        res.status(500).json({ message: 'failed to fetch saved cards', error });
    }
};

