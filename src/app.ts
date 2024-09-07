import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NotFoundError } from './errors';
import { errorHandler, IPayload, rateLimiter } from './middlewares';
import userRouter from './routes/user';
import { appConfig } from './config/appConfig';
import { swatterUIServe, swaggerUiSetup } from '../api_doc/swagger';

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

app.use(rateLimiter);
// Routes
app.use(`${appConfig.API_BASE_PATH}`, userRouter);
app.use(`${appConfig.API_BASE_PATH}/docs`, swatterUIServe, swaggerUiSetup);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
