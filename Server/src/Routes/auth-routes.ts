import { Router, Request, Response } from 'express';
import { User } from '../Models/user.js';
import { createUser } from '../controllers/user-controls.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username },
    });

    if (user) {
        
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {

            const secretKey = process.env.JWT_SECRET_KEY || '';

            const token = jwt.sign({ userId: user.id }, secretKey, {expiresIn: '1h' });

            res.json({ token });
            return;
        }
    }
        res.status(401).json({ message: 'Authentication failed'});
};


const router = Router();

router.post('/login', login);

router.post('/register', createUser);

export default router;