import mongoose, { Model } from 'npm:mongoose';
import { IMember } from '../../interfaces/schemaInterfaces/member.interfaces.ts';

const memberSchema = new mongoose.Schema<IMember>(
    {
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
    { collection: 'members' }
);

const Member: Model<IMember> = new mongoose.model<IMember>('Member', memberSchema);

export default Member;
