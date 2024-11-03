import { Document } from 'npm:mongoose';

export interface IComponent extends Document {
    tip_: string;
    componentDiscordID: string;
    componentID: string;
    disabled: boolean;
}
