export default {
    name: 'certificat-cooldown-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];
        const certificat = interaction.values[0];

        let cooldown = await mongo.hasCooldown(targetID, certificat);
        if (cooldown) {
            await utils.discord.errors.alreadyHasCooldownError(pulsar, interaction);
            return;
        }

        await utils.discord.selectMenus.sendCooldownCertificatDurationSelect({
            pulsar: pulsar,
            interaction: interaction,
            targetID: targetID,
            certificat: certificat
        });
    }
};
