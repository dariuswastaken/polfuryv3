export default {
    name: 'modal-formular-trecere-test',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils) {
        await interaction.deferReply({ ephemeral: true });

        const validate = await utils.discord.validate.formTrecereTest({
            pulsar: pulsar,
            interaction: interaction,
            utils: utils,
            mongo: mongo
        });
        if (validate === 'invalid') return;

        const targetID = interaction.fields.getTextInputValue('form-trecere-test-id');
        const profileAcademie = await mongo.getProfileAcademician(targetID);
        const entryDate = await utils.dayConversion.getCurrentDate();

        const testerProfile = await mongo.getProfile(interaction.user.id);

        if (validate.result === true) {
            await utils.discord.quickFunctions.addMemberPD({
                interaction: interaction,
                mongo: mongo,
                targetID: targetID,
                data: {
                    nume: profileAcademie.nume,
                    IDDiscord: targetID,
                    IDServer: profileAcademie.IDServer,
                    dataIntrare: entryDate,
                    dataActualizare: entryDate
                }
            });

            await utils.discord.embeds.sendSuccessEmbed(
                'Membrul respectiv a fost trecut cu succes.',
                {
                    pulsar: pulsar,
                    interaction: interaction
                }
            );

            const logUID = await pulsar.utilsManager.uniques.createUniqueID();
            await utils.discord.logging.createLog(
                {
                    pulsar: pulsar,
                    interaction: interaction,
                    utils: utils,
                    mongo: mongo,
                    channel: '1204846231017230356',
                    fields: [
                        {
                            name: 'Tester',
                            value: `${testerProfile.nume} (${interaction.user.id})`,
                            inline: true
                        },
                        {
                            name: 'Academician',
                            value: `${profileAcademie.nume} (${targetID})`,
                            inline: true
                        },
                        {
                            name: 'ID Server',
                            value: `${profileAcademie.IDServer}`,
                            inline: true
                        },
                        {
                            name: 'Rezultat',
                            value: `Admis`,
                            inline: false
                        }
                    ],
                    type: 'ADMITERE TEST'
                },
                {
                    tip_: 'evidentaTest',
                    id: logUID,
                    data: {
                        targetID: targetID,
                        testerID: interaction.user.id,
                        IDServer: profileAcademie.IDServer,
                        date: new Date(),
                        result: 'admitere'
                    }
                }
            );
        } else if (validate.result === false) {
            await utils.discord.embeds.sendSuccessEmbed('Membrul respectiv a fost respins.', {
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
                    channel: '1204846231017230356',
                    fields: [
                        {
                            name: 'Tester',
                            value: `${testerProfile.nume} (${interaction.user.id})`,
                            inline: true
                        },
                        {
                            name: 'Academician',
                            value: `${profileAcademie.nume} (${targetID})`,
                            inline: true
                        },
                        {
                            name: 'Rezultat',
                            value: `Respins`,
                            inline: true
                        }
                    ],
                    type: 'RESPINGERE TEST'
                },
                {
                    tip_: 'evidentaTest',
                    id: logUID,
                    data: {
                        targetID: targetID,
                        testerID: interaction.user.id,
                        date: new Date(),
                        result: 'respingere'
                    }
                }
            );
        }
    }
};
