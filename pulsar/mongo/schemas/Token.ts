import mongoose, { Model } from 'npm:mongoose';
import { IToken } from '../../interfaces/schemaInterfaces/token.interfaces.ts';

const tokenSchema = new mongoose.Schema<IToken>(
    {
        IDDiscord: String,
        id: String,
        type: String,
        createdAt: Date,
        expiresAt: Date,
        author: String
    },
    { collection: 'tokens' }
);

const Token: Model<IToken> = new mongoose.model<IToken>('Token', tokenSchema);

export default Token;
