import { Document } from 'npm:mongoose';

export interface IConcediu extends Document {
    IDDiscord: string;
    perioada: string;
    reason: string;
    days: any[];
}
