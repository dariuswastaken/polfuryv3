import { Client, Collection, GatewayIntentBits, Partials } from 'npm:discord.js';
import config from '../../../.config/config.json' with { type: 'json' };
import { ClientCollections } from '../../../interfaces/base/client.interfaces.ts';
import 'jsr:@std/dotenv/load';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildIntegrations
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.Channel,
        Partials.ThreadMember,
        Partials.Reaction
    ]
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

client.config = config.client;

export default client;
