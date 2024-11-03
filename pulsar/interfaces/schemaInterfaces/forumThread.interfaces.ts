import { Document } from 'npm:mongoose';

export interface IForumThread extends Document {
    tip_: string;
    uniqueID: string;
    active: boolean;
    data: Record<string, any>;
}
