import { UserModel } from '../src/database/model';
import { connectDb } from '../src/config/db.connection';

// Step 1: Add `firstName` and `lastName` to the user schema. split name field using space.
export async function up(): Promise<void> {
    await connectDb();
    await UserModel.updateMany({}, [
        {
            $set: {
                firstName: { $arrayElemAt: [{ $split: ['$name', ' '] }, 0] },
                lastName: { $arrayElemAt: [{ $split: ['$name', ' '] }, 1] },
            },
        },
        {
            $unset: 'name',
        },
    ]);

    console.log('Migration up completed: `firstName` and `lastName` fields added');
}

// Step 2: Merge `firstName` and `lastName` back to `name` and remove those fields
export async function down(): Promise<void> {
    await connectDb();
    await UserModel.updateMany({}, [
        {
            $set: { name: { $concat: ['$firstName', ' ', '$lastName'] } },
        },
        {
            $unset: ['firstName', 'lastName'],
        },
    ]);

    console.log('Migration down completed: reverted to `name` field');
}
