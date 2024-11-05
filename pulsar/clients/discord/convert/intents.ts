import { IntentType } from '../../../@types/discord/intents.types';
import { GatewayIntentBits } from 'npm:discord.js';

export function convertToIntentTypes(intents: string | string[]): IntentType[] {
    if (intents === 'all') {
        return Object.values(GatewayIntentBits) as IntentType[];
    }
    return intents.map(
        (intent) => GatewayIntentBits[intent as keyof typeof GatewayIntentBits]
    ) as IntentType[];
}
