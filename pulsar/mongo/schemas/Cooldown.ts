import mongoose, { Model } from 'npm:mongoose';
import { ICooldown } from '../../interfaces/schemaInterfaces/cooldown.interfaces.ts';

const cooldownSchema = new mongoose.Schema<ICooldown>(
    {
        tip_: String,
        IDDiscord: String,
        expiration: Date
    },
    { collection: 'cooldowns' }
);

const Cooldown: Model<ICooldown> = new mongoose.model<ICooldown>('Cooldown', cooldownSchema);

export default Cooldown;
