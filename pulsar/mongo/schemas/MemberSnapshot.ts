import mongoose, { Model } from 'npm:mongoose';
import { IMemberSnapshot } from '../../interfaces/schemaInterfaces/memberSnapshot.interfaces.ts';

const memberSnapshotSchema = new mongoose.Schema<IMemberSnapshot>(
    {
        userData: {
            nume: String,
            IDDiscord: String,
            callsign: String,
            IDServer: Number,
            grad: String,
            corp: String,
            dataIntrare: String,
            dataActualizare: String,
            certificate: {
                radio: Boolean,
                moto: Boolean,
                pilot: Boolean,
                highspeed: Boolean,
                mdt: Boolean
            },
            functii: Array,
            sanctiuni: Array,
            avertismente: Number,
            notite: Array
        },
        IDDiscord: String,
        snapshotID: String,
        snapshotDate: Date
    },
    { collection: 'member-snapshots' }
);

const MemberSnapshot: Model<IMemberSnapshot> = new mongoose.model<IMemberSnapshot>(
    'MemberSnapshot',
    memberSnapshotSchema
);

export default MemberSnapshot;
