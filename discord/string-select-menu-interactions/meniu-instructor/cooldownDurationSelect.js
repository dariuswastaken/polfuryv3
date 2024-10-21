export default {
    name: 'cooldown-certificat-duration-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = interaction.customId.split('/')[1];
        const certificat = interaction.customId.split('/')[2];
        const duration = parseInt(interaction.values[0]);

        const targetProfile = await mongo.getProfile(targetID);
        const instructorProfile = await mongo.getProfile(interaction.user.id);

        await mongo.addCooldown(targetID, certificat, duration);

        await utils.discord.embeds.sendSuccessEmbed(`Cooldown-ul a fost adaugat cu succes.`, {
            pulsar: pulsar,
            interaction: interaction
        });

        const logUID = await pulsar.utilsManager.uniques.createUniqueID();
        await utils.discord.logging.createLog(
            {
                pulsar: pulsar,
                interaction: interaction,
                utils: utils,
                mongo: mongo,
                channel: '1194277120977928282',
                fields: [
                    {
                        name: 'Instructor',
                        value: `${instructorProfile.nume} (${interaction.user.id})`,
                        inline: true
                    },
                    {
                        name: 'Pus lui',
                        value: `${targetProfile.nume} (${targetID})`,
                        inline: true
                    },
                    {
                        name: 'Certificat',
                        value: `${certificat.toUpperCase()}`,
                        inline: true
                    },
                    {
                        name: 'Durata',
                        value: `${duration} zile`,
                        inline: false
                    }
                ],
                type: 'COOLDOWN CERTIFICAT'
            },
            {
                tip_: 'cooldownCertificat',
                id: logUID,
                data: {
                    targetID: targetID,
                    authorID: interaction.user.id,
                    nume: targetProfile.nume,
                    certificat: certificat,
                    duration: duration,
                    date: new Date()
                }
            }
        );
    }
};
