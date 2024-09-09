import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';
import { AuthService } from '../services';
import { UserSignInDto, UserSignupDto } from '../dto/auth.dto';
import { IUser } from '../database/model';
import createSuccessResponse from '../utils/response';

@injectable()
class UserController {
    private authService: AuthService;

    constructor() {
        this.authService = container.resolve(AuthService); // Resolving service using tsyringe
    }

    public async signup(req: Request, res: Response): Promise<void> {
        const user: IUser | undefined = await this.authService.signUp(req.body as UserSignupDto);
        res.status(201).json(createSuccessResponse('Signup success', user));
    }

    public async signin(req: Request, res: Response): Promise<void> {
        const user: { user: IUser; accessToken: string } = await this.authService.signIn(
            req.body as UserSignInDto,
        );
        res.status(200).json(createSuccessResponse('Login success', user));
    }

    public async profile(req: Request, res: Response): Promise<void> {
        const { userId } = req.user!;
        const user: IUser | null = await this.authService.getProfile(userId);
        res.status(200).json(createSuccessResponse('User Profile', user));
    }
}

export default new UserController();
