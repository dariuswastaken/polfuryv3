import mongoose from 'npm:mongoose';

const url = 'mongodb://127.0.0.1:27017/PolDB';

export const init = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        console.log('[MONGO] Already connected to MongoDB');
        return;
    }

    mongoose.set('strictQuery', false);

    mongoose.connect(url);

    const mongo = mongoose.connection;

    mongo.on('error', console.error.bind(console, '[MONGO] Connection error:'));
    console.log('[MONGO] Connected to MongoDB');
};
