import mongoose, { Model } from 'npm:mongoose';
import { IConcediu } from '../../interfaces/schemaInterfaces/concediu.interfaces.ts';

const concediuSchema = new mongoose.Schema<IConcediu>(
    {
        IDDiscord: String,
        perioada: String,
        reason: String,
        days: Array
    },
    { collection: 'concediu' }
);

const Concediu: Model<IConcediu> = new mongoose.model<IConcediu>('Concediu', concediuSchema);

export default Concediu;
