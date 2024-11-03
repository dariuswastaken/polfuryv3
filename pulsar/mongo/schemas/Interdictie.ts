import mongoose, { Model } from 'npm:mongoose';
import { IInterdictie } from '../../interfaces/schemaInterfaces/interdictie.interfaces.ts';

const interdictieSchema = new mongoose.Schema<IInterdictie>(
    {
        tip_: String,
        IDDiscord: String,
        permanent: Boolean || null,
        dataExpirare: Date || null,
        active: Boolean
    },
    { collection: 'interdicties' }
);

const Interdictie: Model<IInterdictie> = new mongoose.model<IInterdictie>(
    'Interdictie',
    interdictieSchema
);

export default Interdictie;
