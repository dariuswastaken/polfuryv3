import { CommandInteraction, Guild, Message } from 'npm:discord.js';
import { EmbedField, EmbedFooter } from '../../../@types/discord/embed.types.ts';

export interface CreateEmbedOptions {
    color?: string;
    title?: string;
    description?: string;
    fields?: EmbedField[];
    footer?: EmbedFooter;
    interaction?: CommandInteraction;
    message?: Message;
    channel?: string;
    components?: any[];
    ephemeral?: boolean;
    deferReply?: boolean;
    guild?: Guild;
    edit?: boolean;
}
