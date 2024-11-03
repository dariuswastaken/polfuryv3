import mongoose, { Model } from 'npm:mongoose';
import { ICallsign } from '../../interfaces/schemaInterfaces/callsign.interfaces.ts';

const callsignSchema = new mongoose.Schema<ICallsign>(
    {
        tip_: String,
        id: String,
        taken: Boolean
    },
    { collection: 'callsigns' }
);

const Callsign: Model<ICallsign> = new mongoose.model<ICallsign>('Callsign', callsignSchema);

export default Callsign;
