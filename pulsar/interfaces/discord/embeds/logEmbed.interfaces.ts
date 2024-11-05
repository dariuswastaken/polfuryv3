import { Guild } from 'npm:discord.js';
import { EmbedField, EmbedFooter } from '../../../@types/discord/embed.types.ts';

export interface CreateLogEmbedOptions {
    title: string;
    fields: EmbedField[];
    description: string;
    footer: EmbedFooter;
    channel: string;
    components: any[];
    guild: Guild;
}
