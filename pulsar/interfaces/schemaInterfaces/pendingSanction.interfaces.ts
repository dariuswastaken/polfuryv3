import { Document } from 'npm:mongoose';

export interface IPendingSanction extends Document {
    sanctionID: string;
    sanctionedID: string;
    authorID: string;
    pending: boolean;
    sanctions: any[] | null;
    reason: string | null;
    active: boolean;
    date: Date;
    scheduled: any[] | null;
}
