export default {
    name: 'slashCommandHandler',
    type: 'interactionBased',
    enabled: true,
    async execute(Pulsar, utils, botconfig, mongo) {
        Pulsar.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const client = Pulsar.client;

            const pulsar = {
                client: client,
                config: await Pulsar.config(),
                utilsManager: Pulsar.utilsManager.createInstance(),
                discordManager: Pulsar.discordManager.createInstance(),
                fileManager: Pulsar.fileManager.createInstance(),
                webManager: Pulsar.webManager.createInstance()
            };

            const { commandName } = interaction;
            if (!client.collections.slashCommands.has(commandName)) return;

            try {
                const slashCommand = await client.collections.slashCommands.get(commandName);
                if (
                    slashCommand.enabled === false &&
                    interaction.user.id !== '1027526587031232552'
                ) {
                    await pulsar.discordManager.embeds.createErrorEmbed(
                        'Eroare',
                        `Aceasta optiune este dezactivata.`,
                        {
                            interaction: interaction,
                            ephemeral: true
                        }
                    );
                    return;
                }
                await slashCommand.execute(pulsar, interaction, mongo, utils, botconfig);
                console.log(
                    `[SLASH COMMANDS] Command ${commandName} was executed by ${interaction.user.tag}`
                );
            } catch (err) {
                console.error(`[SLASH COMMAND ERROR] ${err}\n${err.stack}`);
            }
        });
    }
};
