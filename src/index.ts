import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { connectDB } from './config/db.connection';
import { appConfig } from './config/appConfig';

connectDB();

const PORT: string | number = appConfig.PORT;

app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
});
