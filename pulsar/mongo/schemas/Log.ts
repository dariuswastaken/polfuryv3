import mongoose, { Model } from 'npm:mongoose';
import { ILog } from '../../interfaces/schemaInterfaces/log.interfaces.ts';

const logSchema = new mongoose.Schema<ILog>(
    {
        tip_: String,
        id: String,
        data: Object
    },
    { collection: 'logs' }
);

const Log: Model<ILog> = new mongoose.model<ILog>('Log', logSchema);

export default Log;
