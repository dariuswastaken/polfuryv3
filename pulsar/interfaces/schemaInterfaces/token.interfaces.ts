import { Document } from 'npm:mongoose';

export interface IToken extends Document {
    IDDiscord: string;
    id: string;
    type: string;
    createdAt: Date;
    expiresAt: Date;
    author: string;
}