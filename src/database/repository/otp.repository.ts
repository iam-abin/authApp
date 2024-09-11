import { ClientSession } from 'mongoose';
import { OtpDto } from '../../dto/otp';
import { IOtp, OtpModel } from '../model';

export class OtpRepository {
    async createOtp(otpData: OtpDto, session?: ClientSession): Promise<IOtp> {
        const otp: IOtp[] = await OtpModel.create([otpData], { session });
        return otp[0];
    }

    async findByUserId(userId: string): Promise<IOtp | null> {
        return await OtpModel.findOne({ userId });
    }
}
