import { autoInjectable } from 'tsyringe';
import { IOtp, IUser } from '../database/model';
import { BadRequestError, NotFoundError } from '../errors';
import { sendConfirmationEmail } from '../utils';
import { OtpRepository, UserRepository } from '../database/repository';
import { generateOtp } from '../utils/otp';

@autoInjectable()
export class OtpService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly otpRepository: OtpRepository,
    ) {}

    public async verify(userId: string, otp: string): Promise<IUser | null> {
        const user: IUser | null = await this.userRepository.findUserById(userId);
        if (!user) throw new NotFoundError('This user does not exist');
        const otpData: IOtp | null = await this.otpRepository.findByUserId(userId);
        if (!otpData) throw new NotFoundError('Otp has expired');
        if (otp != otpData.otp) throw new BadRequestError('Invalid otp');
        const updatedUser: IUser | null = await this.userRepository.updateUserVerification(userId);
        return updatedUser;
    }

    public async resendOtp(userId: string): Promise<IUser> {
        const user: IUser | null = await this.userRepository.findUserById(userId);
        if (!user) throw new NotFoundError('This user does not exist');
        if (user.isVerified) throw new BadRequestError('You are already verified. Please signin');

        const otp: string = generateOtp();
        const createdOtp: IOtp = await this.otpRepository.createOtp({ userId, otp });
        await sendConfirmationEmail(user.email, createdOtp.otp);
        return user;
    }
}
