import { Request, Response } from 'express';
import { AuthService } from '../services';
import { UserSignInDto, UserSignupDto } from '../dto/auth.dto';
import { IUser } from '../database/model';
import { createJwtAccessToken } from '../utils/jwt';

const authService = new AuthService();

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signUp(req.body as UserSignupDto);
    res.status(201).json(user);
};

const signin = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await authService.signIn(req.body as UserSignInDto);
    const userPayload = {
        userId: user._id as string,
        name: user.name,
        email: user.email,
    };
    const jwt: string = createJwtAccessToken(userPayload);
    res.status(200).json({ message: 'login success', user, accessToken: jwt });
};

export default { signup, signin };
