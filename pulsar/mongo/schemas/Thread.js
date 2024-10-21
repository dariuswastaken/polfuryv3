import mongoose from 'npm:mongoose';

const threadSchema = new mongoose.Schema(
    {
        tip_: String,
        uniqueID: String,
        data: {
            channelID: String,
            threadID: String,
            creatorID: String,
            dataCreate: Date,
            status: String
        }
    },
    { collection: 'threads' }
);

const Thread = new mongoose.model('Thread', threadSchema);

export default Thread;
