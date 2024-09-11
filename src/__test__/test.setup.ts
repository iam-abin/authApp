import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Initialize and start the MongoDB memory-server before all tests start
let mongo: MongoMemoryServer | undefined;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

// Before each test starts, delete all data inside the MongoDB database
beforeEach(async () => {
    // Ensure connection and database exist
    const db = mongoose.connection.db;
    if (db) {
        const collections = await db.collections();
        // console.log('connected to MongoMemoryServer...🛢');

        for (const collection of collections) {
            await collection.deleteMany({});
        }
    } else {
        throw new Error('Error connecting to MongoMemoryServer');
    }
});

// Stop MongoDB memory-server after tests finish
afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});
