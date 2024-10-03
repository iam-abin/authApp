import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { connectDb } from './config/db.connection';
import { appConfig } from './config/appConfig';

connectDb();

const PORT: string | number = appConfig.PORT;

app.listen(PORT, (): void => {
    console.log(`Server is listening on port ${PORT}...`);
});
