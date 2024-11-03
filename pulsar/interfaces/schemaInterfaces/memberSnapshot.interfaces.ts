import { Document } from 'npm:mongoose';

export interface IMemberSnapshot extends Document {
    userData: {
        nume: string;
        IDDiscord: string;
        callsign: string;
        IDServer: number;
        grad: string;
        corp: string;
        dataIntrare: string;
        dataActualizare: string;
        certificate: {
            radio: boolean;
            moto: boolean;
            pilot: boolean;
            highspeed: boolean;
            mdt: boolean;
        };
        functii: any[];
        sanctiuni: any[];
        avertismente: number;
        notite: any[];
    };
    IDDiscord: string;
    snapshotID: string;
    snapshotDate: Date;
}
