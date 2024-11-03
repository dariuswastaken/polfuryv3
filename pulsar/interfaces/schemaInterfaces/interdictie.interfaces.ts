import { Document } from 'npm:mongoose';

export interface IInterdictie extends Document {
    tip_: string;
    IDDiscord: string;
    permanent: boolean | null;
    dataExpirare: Date | null;
    active: boolean;
}
