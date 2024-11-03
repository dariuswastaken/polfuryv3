import { Document } from 'npm:mongoose';

export interface ICooldown extends Document {
    tip_: string;
    IDDiscord: string;
    expiration: Date;
}
