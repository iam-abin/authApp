import mongoose from 'mongoose';

import { DatabaseConnectionError } from '../errors';
import { appConfig } from './appConfig';

const connectDB = async () => {
    try {
        await mongoose.connect(appConfig.MONGO_URI, { retryWrites: true, w: 'majority' });
        console.log('connected to mongodb...🛢');
    } catch (error) {
        console.log(error);
        throw new DatabaseConnectionError();
    }
};

export { connectDB };
