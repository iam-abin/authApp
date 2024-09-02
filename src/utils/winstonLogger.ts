import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const winstonLogger = createLogger({
    level: 'info', // error: 0, warn: 1, info: 2 will be printed.
    format: combine(timestamp({ format: 'HH:mm:ss' }), myFormat),
    transports: [new transports.Console(), new transports.File({ filename: 'error.log', level: 'info' })],
});

export const winstonLogError = (err: Error) => {
    winstonLogger.error(`💥 ${err}\n${err.stack}`);
};
