import { CommandInteraction, Guild, Message } from 'npm:discord.js';
import { EmbedField, EmbedFooter } from '../../../@types/discord/embed.types.ts';

export interface CreateErrorEmbedOptions {
    fields?: EmbedField[];
    footer?: EmbedFooter;
    interaction?: CommandInteraction;
    message?: Message;
    channel?: string;
    components?: any[];
    edit?: boolean;
    ephemeral?: boolean;
    deferReply?: boolean;
    guild?: Guild;
}