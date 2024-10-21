import mongoose from 'npm:mongoose';

const logSchema = new mongoose.Schema(
    {
        tip_: String,
        id: String,
        data: Object
    },
    { collection: 'logs' }
);

const Log = new mongoose.model('Log', logSchema);

export default Log;
