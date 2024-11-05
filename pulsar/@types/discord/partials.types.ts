import { Partials } from 'npm:discord.js';

export type PartialsType =
    | Partials.Channel
    | Partials.GuildMember
    | Partials.GuildScheduledEvent
    | Partials.Message
    | Partials.Reaction
    | Partials.ThreadMember
    | Partials.User;
