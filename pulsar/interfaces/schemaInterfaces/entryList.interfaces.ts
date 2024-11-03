import { Document } from 'npm:mongoose';

export interface IEntryList extends Document {
    tip_: string;
    week: string;
    list: any[];
}