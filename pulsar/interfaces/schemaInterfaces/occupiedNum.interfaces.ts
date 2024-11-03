import { Document } from 'npm:mongoose';

export interface IOccupiedNum extends Document {
    tip_: string;
    ID: number;
    active: boolean;
}
