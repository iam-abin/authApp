import jwt from 'jsonwebtoken';
import { appConfig } from '../config/appConfig';

export interface IJwtPayload {
    userId: string;
    name: string;
    email: string;
}

export const createJwtAccessToken = (payload: IJwtPayload): string => {
    const accessToken: string = jwt.sign(payload, appConfig.JWT_SECRET as string, {
        expiresIn: appConfig.JWT_EXPIRY_TIME,
    });
    return accessToken;
};

export const verifyJwtToken = (token: string): IJwtPayload => {
    const decodedData = jwt.verify(token, appConfig.JWT_SECRET!) as IJwtPayload;
    return decodedData;
};
