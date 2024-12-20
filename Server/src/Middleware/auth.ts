import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET_KEY || '';
        console.log(token);
        jwt.verify(token, secretKey, (err, decoded: any) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.params.userId = decoded.id;
            return next();
        });
    } else {
        res.sendStatus(401);
    }
};