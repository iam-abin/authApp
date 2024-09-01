const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_CONNECTION_STRING as string,
};

export { config };
