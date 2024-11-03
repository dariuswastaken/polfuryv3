import mongoose, { Model } from 'npm:mongoose';
import { IActivitateSnapshot } from '../../interfaces/schemaInterfaces/activitateSnapshot.interfaces.ts';

const activitateSnapshotSchema = new mongoose.Schema<IActivitateSnapshot>(
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
        },
        snapshotID: String
    },
    { collection: 'activitate-snapshot' }
);

const ActivitateSnapshot: Model<IActivitateSnapshot> = new mongoose.model<IActivitateSnapshot>(
    'ActivitateSnapshot',
    activitateSnapshotSchema
);

export default ActivitateSnapshot;
