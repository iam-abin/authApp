import { UserSignupDto } from '../../dto/auth.dto';
import { IUser, UserModel } from '../model';

export class UserRepository {
    async createUser(userData: UserSignupDto): Promise<IUser> {
        const newUser = await UserModel.create(userData);
        return newUser;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }
}
