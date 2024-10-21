export default {
    name: 'lista-cooldowns',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];
        const targetProfile = await mongo.getProfile(targetID);

        const userCooldowns = await mongo.getCooldowns(targetID);

        let activeList = [];
        for (let cooldown of userCooldowns) {
            const expirationDate = new Date(cooldown.expiration);
            if (Date.now() < expirationDate.getTime()) {
                activeList.push(cooldown);
            }
        }

        if (!userCooldowns) {
            await utils.discord.errors.noCooldownsError(pulsar, interaction);
            return;
        }

        if (activeList.length === 0) {
            await utils.discord.errors.noCooldownsError(pulsar, interaction);
            return;
        }

        await utils.discord.embeds.sendUserCooldownList({
            pulsar: pulsar,
            interaction: interaction,
            mongo: mongo,
            targetID: targetID
        });
    }
};
