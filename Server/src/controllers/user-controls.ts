import { Request, Response } from 'express';
import { User } from '../Models/user.js';



export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try { 
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message});
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.setPassword(password);
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (err: any) {
        res.status(400).json({ message: err.message});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try { 
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User has been deleted.'});
        } else {
            res.status(404).json({ message: 'User not found'});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};