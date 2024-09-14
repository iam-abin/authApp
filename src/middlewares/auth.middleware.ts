import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';
import { IJwtPayload, verifyJwtToken } from '../utils';

declare global {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new NotAuthorizedError('UnAuthorized Request');

        const decoded: IJwtPayload = verifyJwtToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
