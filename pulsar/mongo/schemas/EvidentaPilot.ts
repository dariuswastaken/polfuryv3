import mongoose, { Model } from 'npm:mongoose';
import { IEvidentaPilot } from '../../interfaces/schemaInterfaces/evidentaPilot.interfaces.ts';

const eivdentaPilotSchema = new mongoose.Schema<IEvidentaPilot>(
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
    { collection: 'evidentePilot' }
);

const EvidentaPilot: Model<IEvidentaPilot> = new mongoose.model<IEvidentaPilot>(
    'EvidentaPilot',
    eivdentaPilotSchema
);

export default EvidentaPilot;
