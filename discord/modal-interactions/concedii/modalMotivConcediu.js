export default {
    name: 'modal-motiv-concediu',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const validate = await utils.discord.validate.motivConcediu({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo
        });
        if (validate === 'invalid') return;

        const profile = await mongo.getProfile(interaction.user.id);

        const inputMotiv = await interaction.fields.getTextInputValue('m-concediu-motiv');

        const week = await utils.dayConversion.getCurrentWeek();
        const leave = await mongo.getLeave(interaction.user.id, `${week[0]} - ${week[6]}`);

        await mongo.updateLeaveReason(interaction.user.id, inputMotiv);
        await utils.discord.embeds.sendSuccessEmbed('Motivul a fost actualizat cu succes.', {
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
                channel: '1194276959367200819',
                fields: [
                    {
                        name: 'Membru',
                        value: `${profile.nume} (${interaction.user.id})`,
                        inline: true
                    },
                    {
                        name: 'ID',
                        value: `${profile.IDServer}`,
                        inline: true
                    },
                    {
                        name: 'Zile',
                        value: `${leave.days.join(', ')}`,
                        inline: true
                    },
                    {
                        name: 'Motiv',
                        value: `${inputMotiv}`,
                        inline: false
                    }
                ],
                type: 'CONCEDIU'
            },
            {
                tip_: 'concediu',
                id: logUID,
                data: {
                    authorID: interaction.user.id
                }
            }
        );
    }
};
