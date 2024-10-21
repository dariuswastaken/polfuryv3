export default {
    name: 'update-activitate',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });
        try {
            const members = await mongo.getAllMembers();
            for (let member of members) {
                await utils.discord.embeds.sendWarningEmbed(
                    `Se updateaza activitatea pentru ${member.nume} (${member.IDServer})...`,
                    {
                        pulsar: pulsar,
                        interaction: interaction
                    }
                );
                const mdtData = await pulsar.webManager.getUserMdtData(member.IDServer);
                if (mdtData) {
                    await mongo.updateActivity(member.IDDiscord, member.IDServer, {
                        pontaj: parseInt(mdtData[6]),
                        rapoarte: parseInt(mdtData[4]),
                        amenzi: parseInt(mdtData[3]),
                        apeluri: parseInt(mdtData[5]),
                        lastLogin: mdtData[7]
                    });
                }
            }
        } catch (error) {
            await utils.discord.embeds.sendActivityUpdateRetryEmbed(
                'A aparut o eroare in timpul actualizarii, incearca din nou.',
                {
                    pulsar: pulsar,
                    interaction: interaction
                }
            );
            return;
        }

        await utils.discord.embeds.sendSuccessEmbed('Activitatea a fost actualizata cu succes.', {
            pulsar: pulsar,
            interaction: interaction
        });
    }
};
