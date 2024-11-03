import { CommandInteraction, Guild, Message } from 'npm:discord.js';

export interface CreateSuccessEmbedOptions {
  fields: { name: string; value: string; inline?: boolean }[];
  footer: { text: string; icon_url?: string };
  interaction: CommandInteraction;
  message: Message;
  channel: string;
  components: any[];
  edit: boolean;
  ephemeral: boolean;
  deferReply: boolean;
  guild: Guild;
}