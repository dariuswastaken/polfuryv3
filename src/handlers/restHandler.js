const { REST, Routes } = require('discord.js');
const { Pulsar } = require('../../pulsar/index.pulsar.js');

const client = Pulsar().client;

module.exports.registerApplicationCommands = async function () {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('[DISCORD API] Started refreshing application (/) commands.');

    const commands = [
      ...client.collections.slashCommands.map((command) =>
        command.data.toJSON()
      ),
      ...client.collections.contextMenus.map((contextMenu) =>
        contextMenu.data.toJSON()
      )
    ];

    await rest.put(
      Routes.applicationGuildCommands(client.user.id, '1094602196940767372'),
      { body: commands }
    );

    console.log(
      '[DISCORD API] Successfully reloaded application (/) commands.'
    );
  } catch (err) {
    console.log(`[FILESYSTEM ERROR] ${err}`);
  }
};
