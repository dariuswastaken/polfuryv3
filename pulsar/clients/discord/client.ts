import { Client, Collection } from 'npm:discord.js';
import config from '../../.config/config.json' with { type: 'json' };
import { ClientCollections } from '../../interfaces/base/client.interfaces.ts';
import 'jsr:@std/dotenv/load';
import { convertToIntentTypes } from './convert/intents.ts';
import { convertToPartialsTypes } from './convert/partials.ts';

export function createDiscordClient(
    intentBits: string[] | string = 'all',
    partials: string[] | string = 'all'
): Promise<Client> {
    const client = new Client({
        intents: convertToIntentTypes(intentBits),
        partials: convertToPartialsTypes(partials)
    });

    client.collections = {
        events: new Collection(),
        slashCommands: new Collection(),
        buttonInteractionEvents: new Collection(),
        contextMenus: new Collection(),
        handlers: new Collection(),
        modalInteractionEvents: new Collection(),
        stringSelectMenuInteractionEvents: new Collection()
    } as ClientCollections;

    return client;
}
