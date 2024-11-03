import { Guild } from 'npm:discord.js';

export interface CreateLogEmbedOptions {
    title: string;
    fields: { name: string; value: string; inline?: boolean }[];
    description: string;
    footer: { text: string; icon_url?: string };
    channel: string;
    components: any[];
    guild: Guild;
}
