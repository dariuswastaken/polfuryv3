import { Document } from 'npm:mongoose';

export interface IAcademician extends Document {
    nume: string;
    IDDiscord: string;
    IDServer: number;
    dataIntrare: Date;
    dataActualizare: Date;
    esuariTest: number;
    cooldown: Date | null;
    prezentaAcademie: boolean;
    suspendat: boolean;
}
