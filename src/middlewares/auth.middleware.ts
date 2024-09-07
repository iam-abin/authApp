import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';
import { config } from '../config/config';

export interface IPayload {
    userId: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IPayload;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new NotAuthorizedError('UnAuthorized Request');
        const decoded = jwt.verify(token, config.JWT_SECRET!) as IPayload;
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
