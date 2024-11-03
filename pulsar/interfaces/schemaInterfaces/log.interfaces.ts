import { Document } from 'npm:mongoose';

export interface ILog extends Document {
    tip_: string;
    id: string;
    data: Record<string, any>;
}