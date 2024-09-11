import { UserSignupDto } from '../../dto/auth.dto';
import { IUser, UserModel } from '../model';

export class UserRepository {
    async createUser(userData: UserSignupDto): Promise<IUser> {
        return await UserModel.create(userData);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return await UserModel.findById(userId);
    }
}
