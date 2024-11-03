import mongoose, { Model } from 'npm:mongoose';
import { IPendingSanction } from '../../interfaces/schemaInterfaces/pendingSanction.interfaces.ts';

const pendingSanctionSchema = new mongoose.Schema<IPendingSanction>(
    {
        sanctionID: String,
        sanctionedID: String,
        authorID: String,
        pending: Boolean,
        sanctions: Array || null,
        reason: String || null,
        active: Boolean,
        date: Date,
        scheduled: Array || null
    },
    { collection: 'pendingSanctions' }
);

const PendingSanction: Model<IPendingSanction> = new mongoose.model<IPendingSanction>(
    'PendingSanction',
    pendingSanctionSchema
);

export default PendingSanction;
