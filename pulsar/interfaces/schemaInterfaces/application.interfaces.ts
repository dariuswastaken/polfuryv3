import { Document } from 'npm:mongoose';

export interface IApplication extends Document {
    tip_: string;
    IDDiscord: string;
    uniqueID: string;
    callsign: string;
    nume: string;
    data: Date;
    messageID: string;
    status: string;
}
