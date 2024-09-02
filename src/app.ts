import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NotFoundError } from './errors/notfound.error';
import { errorHandler } from './middlewares';

const app: Application = express();

const isProductionENV = process.env.NODE_ENV === 'production';

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
app.get('/', (req: Request, res: Response) => {
    const a = 10;
    console.log('abin');
    if (a === 10) throw new Error();
    res.status(200).json({ message: 'success' });
});

// app.use("/api/v1/auth", authRouter);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
