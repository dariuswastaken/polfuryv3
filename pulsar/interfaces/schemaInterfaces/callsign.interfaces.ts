import { Document } from 'npm:mongoose';

export interface ICallsign extends Document {
    tip_: string;
    id: string;
    taken: boolean;
}
