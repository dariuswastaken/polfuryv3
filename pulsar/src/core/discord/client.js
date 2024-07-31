const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits
} = require('discord.js');
const config = require('../../../.config/config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations
  ],
  partials: [
    Partials.Message,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.Channel,
    Partials.ThreadMember,
    Partials.Reaction
  ]
});

client.collections = {
  events: new Collection(),
  slashCommands: new Collection(),
  buttonInteractionEvents: new Collection(),
  contextMenus: new Collection(),
  handlers: new Collection(),
  modalInteractionEvents: new Collection(),
  stringSelectMenuInteractionEvents: new Collection(),
};

client.guildID = process.env.GUILD_ID;

client.config = config.client;

module.exports = {
  client
};
