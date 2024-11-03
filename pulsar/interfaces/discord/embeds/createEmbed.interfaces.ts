import { CommandInteraction, Guild, Message } from 'npm:discord.js';

export interface CreateEmbedOptions {
    color?: string;
    title?: string;
    description?: string;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: { text: string; icon_url?: string };
    interaction?: CommandInteraction;
    message?: Message;
    channel?: string;
    components?: any[];
    ephemeral?: boolean;
    deferReply?: boolean;
    guild?: Guild;
    edit?: boolean;
}
