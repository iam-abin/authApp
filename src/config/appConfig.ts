interface IAppConfig {
    PORT: string | number;
    MONGO_URI: string;
    NODE_ENVIRONMENT: string;
    API_BASE_PATH: string;
    JWT_SECRET: string | undefined;
    JWT_EXPIRY_TIME: string;

    EMAIL_USER: string | undefined;
    EMAIL_PASSWORD: string | undefined;
}

const appConfig: IAppConfig = Object.freeze({
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGODB_CONNECTION_STRING as string,
    NODE_ENVIRONMENT: process.env.NODE_ENV as string,
    API_BASE_PATH: '/api',
    JWT_SECRET: process.env.PORT,
    JWT_EXPIRY_TIME: '1h',

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
});

export { appConfig };
