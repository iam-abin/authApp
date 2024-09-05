import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import authRouter from './routes/auth';

const app: Application = express();

const isProductionENV: boolean = process.env.NODE_ENV === 'production';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
    cors({
        origin: '*',
    }),
);
if (!isProductionENV) app.use(morgan('dev'));

// Routes

app.use('/api/v1/auth', authRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
