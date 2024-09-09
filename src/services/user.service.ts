import { inject, injectable } from 'tsyringe';
import { IUser } from '../database/model';
import { UserSignInDto, UserSignupDto } from '../dto/auth.dto';
import { BadRequestError } from '../errors';
import { comparePassword, createJwtAccessToken, IJwtPayload, sendConfirmationEmail } from '../utils';
import { UserRepository } from '../database/repository';

@injectable()
export class AuthService {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    public async signUp(userRegisterDto: UserSignupDto): Promise<IUser> {
        const { email } = userRegisterDto;

        const existingUser: IUser | null = await this.userRepository.findByEmail(email);
        if (existingUser) throw new BadRequestError('User already exists');

        const createdUser = await this.userRepository.createUser(userRegisterDto);

        const SUBJECT = 'Innobyte User App Confirmation';
        const TOPIC = 'Innobyte User App Confirmation 2';

        await sendConfirmationEmail(email, SUBJECT, TOPIC);
        return createdUser;
    }

    public async signIn(userSignInDto: UserSignInDto): Promise<{ user: IUser; accessToken: string }> {
        const { email, password } = userSignInDto;

        const existingUser: IUser | null = await this.userRepository.findByEmail(email);
        if (!existingUser) throw new BadRequestError('Invalid email or password');
        const isSamePassword: boolean = await comparePassword(password, existingUser.password);
        if (!isSamePassword) throw new BadRequestError('Invalid email or password');

        const userPayload: IJwtPayload = {
            userId: existingUser._id as string,
            name: existingUser.name,
            email: existingUser.email,
        };
        const jwt: string = createJwtAccessToken(userPayload);

        return { user: existingUser, accessToken: jwt };
    }

    public async getProfile(userId: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.findUserById(userId);
        if (!user) throw new BadRequestError('This user does not exist');
        return user;
    }
}
