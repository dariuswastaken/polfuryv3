import { Guild } from 'npm:discord.js';

export interface CreateForumThreadEmbedOptions {
    title: string;
    description: string;
    fields: { name: string; value: string; inline?: boolean }[];
    footer: { text: string; icon_url?: string };
    components: any[];
    guild: Guild;
}
