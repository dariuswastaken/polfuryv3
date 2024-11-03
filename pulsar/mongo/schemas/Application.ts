import mongoose, { Model } from 'npm:mongoose';
import { IApplication } from '../../interfaces/schemaInterfaces/application.interfaces.ts';

const applicationSchema = new mongoose.Schema<IApplication>(
    {
        tip_: String,
        IDDiscord: String,
        uniqueID: String,
        callsign: String,
        nume: String,
        data: Date,
        messageID: String,
        status: String
    },
    { collection: 'aplicatii' }
);

const Application: Model<IApplication> = new mongoose.model<IApplication>(
    'Application',
    applicationSchema
);

export default Application;
