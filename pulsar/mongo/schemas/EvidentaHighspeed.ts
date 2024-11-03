import mongoose, { Model } from 'npm:mongoose';
import { IEvidentaHighspeed } from '../../interfaces/schemaInterfaces/evidentaHighspeed.interfaces.ts';

const eivdentaHighspeedSchema = new mongoose.Schema<IEvidentaHighspeed>(
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
    { collection: 'evidenteHighspeed' }
);

const EvidentaHighspeed: Model<IEvidentaHighspeed> = new mongoose.model<IEvidentaHighspeed>(
    'EvidentaHighspeed',
    eivdentaHighspeedSchema
);

export default EvidentaHighspeed;
