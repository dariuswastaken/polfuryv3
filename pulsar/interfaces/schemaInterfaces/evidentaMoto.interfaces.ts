import { Document } from 'npm:mongoose';

export interface IEvidentaMoto extends Document {
    tip_: string;
    uniqueID: string;
    userID: string;
    active: boolean;
    data: {
        nume: string;
        tip: string;
        IDDiscord: string;
        numarInmatriculare: string;
        dataClockIn: Date;
        dataClockOut: Date | null;
    };
}
