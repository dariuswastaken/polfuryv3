import { Guild } from 'npm:discord.js';
import { EmbedField, EmbedFooter } from '../../../@types/discord/embed.types.ts';

export interface CreateForumThreadEmbedOptions {
    title: string;
    description: string;
    fields: EmbedField[];
    footer: EmbedFooter;
    components: any[];
    guild: Guild;
}
