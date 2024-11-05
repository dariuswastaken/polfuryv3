import mongoose from 'npm:mongoose';

const url = 'mongodb://127.0.0.1:27017/PolDB';

export const init = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) {
        console.log('[MONGO] Already connected to MongoDB');
        return;
    }

    mongoose.set('strictQuery', false);

    try {
        mongoose.connect(url);
    } catch (error) {
        console.log(`[MONGO] Error connecting to MongoDB`);
        console.error(error);
    }

    const mongo = mongoose.connection;

    mongo.on('error', console.error.bind(console, '[MONGO] Connection error:'));
    mongo.once('open', () => console.log('[MONGO] Connected to MongoDB'));
};
