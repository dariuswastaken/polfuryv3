import mongoose, { Model } from 'npm:mongoose';
import { IEvidentaMoto } from '../../interfaces/schemaInterfaces/evidentaMoto.interfaces.ts';

const eivdentaMotoSchema = new mongoose.Schema<IEvidentaMoto>(
    {
        tip_: String,
        uniqueID: String,
        userID: String,
        active: Boolean,
        data: {
            nume: String,
            tip: String,
            IDDiscord: String,
            numarInmatriculare: String,
            dataClockIn: Date,
            dataClockOut: Date || null
        }
    },
    { collection: 'evidenteMoto' }
);

const EvidentaMoto: Model<IEvidentaMoto> = new mongoose.model<IEvidentaMoto>(
    'EvidentaMoto',
    eivdentaMotoSchema
);

export default EvidentaMoto;
