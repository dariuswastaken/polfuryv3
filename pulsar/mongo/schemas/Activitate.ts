import mongoose, { Model } from 'npm:mongoose';
import { IActivitate } from '../../interfaces/schemaInterfaces/activitate.interfaces.ts';

const activitateSchema = new mongoose.Schema<IActivitate>(
    {
        IDDiscord: String,
        IDServer: Number,
        lastUpdate: Date,
        perioada: String,
        data: {
            pontaj: Number,
            rapoarte: Number,
            amenzi: Number,
            apeluri: Number,
            lastLogin: String
        }
    },
    { collection: 'activitate-new' }
);

const ActivitateBeta: Model<IActivitate> = new mongoose.model<IActivitate>(
    'Activitate',
    activitateSchema
);

export default ActivitateBeta;
