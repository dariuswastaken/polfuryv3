import { REST, Routes } from 'npm:discord.js';
import { Pulsar } from '../../pulsar/index.pulsar.ts';

const client = Pulsar().client;

export const registerApplicationCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('[DISCORD API] Started refreshing application (/) commands.');

        const commands = [
            ...client.collections.slashCommands.map((command) => command.data.toJSON()),
            ...client.collections.contextMenus.map((contextMenu) => contextMenu.data.toJSON())
        ];

        await rest.put(Routes.applicationGuildCommands(client.user.id, '1094602196940767372'), {
            body: commands
        });

        console.log('[DISCORD API] Successfully reloaded application (/) commands.');
    } catch (err) {
        console.log(`[FILESYSTEM ERROR] ${err}`);
    }
};
