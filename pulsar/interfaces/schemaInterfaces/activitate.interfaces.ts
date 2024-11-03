import { Document } from 'npm:mongoose';

export interface IActivitate extends Document {
    IDDiscord: string;
    IDServer: number;
    lastUpdate: Date;
    perioada: string;
    data: {
        pontaj: number;
        rapoarte: number;
        amenzi: number;
        apeluri: number;
        lastLogin: string;
    };
}
