import { IUser } from '../database/model';
import { UserRepository } from '../database/repository/user.repository';
import { UserSignInDto, UserSignupDto } from '../dto/auth.dto';
import { BadRequestError } from '../errors';
import { comparePassword } from '../utils';

const userRepository = new UserRepository();

export class AuthService {
    public async signUp(userRegisterDto: UserSignupDto): Promise<IUser> {
        const { email } = userRegisterDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);
        if (existingUser) throw new BadRequestError('User already exists');

        const createdUser = await userRepository.createUser(userRegisterDto);
        return createdUser;
    }

    public async signIn(userSignInDto: UserSignInDto): Promise<IUser> {
        const { email, password } = userSignInDto;

        const existingUser: IUser | null = await userRepository.findByEmail(email);
        if (!existingUser) throw new BadRequestError('Invalid email or password');
        const isSamePassword: boolean = await comparePassword(password, existingUser.password);
        if (!isSamePassword) throw new BadRequestError('Invalid email or password');

        return existingUser;
    }
}
