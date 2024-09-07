import { Request, Response } from 'express';
import { AuthService } from '../services';
import { UserSignInDto, UserSignupDto } from '../dto/auth.dto';
import { IUser } from '../database/model';
import createSuccessResponse from '../utils/response';

const authService = new AuthService();

const signup = async (req: Request, res: Response): Promise<void> => {
    const user: IUser | undefined = await authService.signUp(req.body as UserSignupDto);
    res.status(201).json(createSuccessResponse('Signup success', user));
};

const signin = async (req: Request, res: Response): Promise<void> => {
    const user: { user: IUser; accessToken: string } = await authService.signIn(req.body as UserSignInDto);
    res.status(200).json(createSuccessResponse('Login success', user));
};

const profile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user!;
    const user: IUser | null = await authService.getProfile(userId);
    res.status(200).json(createSuccessResponse('User Profile', user));
};

export default { signup, signin, profile };
