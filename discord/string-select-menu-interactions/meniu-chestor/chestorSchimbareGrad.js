export default {
    name: 'chestor-schimbare-grad-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const rank = interaction.values[0];
        const targetID = interaction.customId.split('/')[1];
        const user = await interaction.guild.members.fetch(targetID);
        const targetProfile = await mongo.getProfile(targetID);

        const availableCallsign = await mongo.getAvailableCallsign(rank);
        const updateDate = await utils.dayConversion.getCurrentDate();

        if (!availableCallsign) {
            await utils.discord.errors.noAvailableCallsignError(pulsar, interaction);
            return;
        }

        await mongo.updateCallsign(rank, availableCallsign.id, true);
        await mongo.updateCallsign(targetProfile.grad, targetProfile.callsign, false);
        await mongo.updateProfileDate(targetID, updateDate);
        await mongo.updateProfileCallsign(targetID, availableCallsign.id);
        await mongo.updateProfileRank(targetID, rank);

        await user.setNickname(`[${availableCallsign.id}] ${targetProfile.nume}`);
        await utils.discord.roles.updateRankRolesCI(user, rank);

        await utils.discord.embeds.sendSuccessEmbed(
            `Gradul a fost actualizat cu succes!\n\nNoul grad este: **${rank}** (Callsign: **${availableCallsign.id}**)\nGradul vechi: **${targetProfile.grad}** (Callsign: **${targetProfile.callsign}**).`,
            {
                pulsar: pulsar,
                interaction: interaction
            }
        );

        const logUID = await pulsar.utilsManager.uniques.createUniqueID();
        await utils.discord.logging.createSimpleLog(mongo, {
            type: 'schimbareGrad',
            id: logUID,
            data: {
                targetID: targetID,
                author: interaction.user.id,
                newRank: rank,
                newCallsign: availableCallsign.id,
                oldRank: targetProfile.grad,
                oldCallsign: targetProfile.callsign,
                date: new Date()
            }
        });
    }
};
