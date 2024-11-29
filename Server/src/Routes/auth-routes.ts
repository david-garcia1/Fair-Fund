import { Router, Request, Response } from 'express';
import { User } from '../Models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username },
    });

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed'});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ message: 'Authentication failed'});
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ userId: user.id }, secretKey, {expiresIn: '1h' });
    return res.json({ token });
};

const router = Router();

router.post('/login', login);

export default router;