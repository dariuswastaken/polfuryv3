import { CommandInteraction, Guild, Message } from 'npm:discord.js';
import { EmbedField, EmbedFooter } from '../../../@types/discord/embed.types.ts';

export interface CreateDefaultEmbedOptions {
    fields?: EmbedField[];
    footer?: EmbedFooter;
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
