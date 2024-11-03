import { CommandInteraction, Guild, Message } from 'npm:discord.js';

export interface CreateDefaultEmbedOptions {
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: { text: string; icon_url?: string };
    title?: string;
    image?: string;
    thumbnail?: string;
    interaction?: CommandInteraction;
    message?: Message;
    channel?: string;
    components?: any[];
    edit?: boolean;
    ephemeral?: boolean;
    deferReply?: boolean;
    followUp?: boolean;
    guild?: Guild;
    files?: any[];
}
