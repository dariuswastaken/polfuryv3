import { GatewayIntentBits } from 'npm:discord.js';

export type IntentType =
    | GatewayIntentBits.Guilds
    | GatewayIntentBits.GuildMessages
    | GatewayIntentBits.GuildMembers
    | GatewayIntentBits.MessageContent
    | GatewayIntentBits.GuildMessageReactions
    | GatewayIntentBits.DirectMessageReactions
    | GatewayIntentBits.DirectMessages
    | GatewayIntentBits.GuildIntegrations
    | GatewayIntentBits.AutoModerationConfiguration
    | GatewayIntentBits.GuildBans
    | GatewayIntentBits.GuildInvites
    | GatewayIntentBits.GuildModeration
    | GatewayIntentBits.GuildVoiceStates
    | GatewayIntentBits.AutoModerationExecution
    | GatewayIntentBits.DirectMessageTyping
    | GatewayIntentBits.GuildEmojisAndStickers
    | GatewayIntentBits.GuildMessageTyping
    | GatewayIntentBits.GuildPresences
    | GatewayIntentBits.GuildWebhooks
    | GatewayIntentBits.DirectMessagePolls
    | GatewayIntentBits.GuildScheduledEvents;
