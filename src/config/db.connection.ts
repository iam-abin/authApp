import mongoose from 'mongoose';

import { DatabaseConnectionError } from '../errors';
import { appConfig } from './appConfig';

const connectDb = async () => {
    try {
        await mongoose.connect(appConfig.MONGO_URI, {
            retryWrites: true,
            w: 'majority',
            connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        });
        console.log('connected to mongodb...🛢');
    } catch (error) {
        console.log(error);
        throw new DatabaseConnectionError();
    }
};

export { connectDb };
