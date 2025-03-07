import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendSanctionMenu = async (
    { pulsar, interaction, mongo, targetID, sanctionID },
    botconfig
) => {
    const nonFormattedButtons = botconfig.sanctionThreadCreationMenusButtons.buttons;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
        targetid: targetID,
        sanctionid: sanctionID
    });

    const rows = await pulsar.discordManager.menus.createButtonMenu({
        perLine: 3,
        buttons: buttons
    });

    await mongo.createSanction({
        authorID: interaction.user.id,
        sanctionID: sanctionID,
        sanctionedID: targetID
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
        'Alege o sanctiune din meniul de mai jos.\n\n**Dupa selectarea sanctiunilor, apasa pe "✅ Confirmare" pentru a adauga motivul sanctiunii/lor.**',
        {
            title: 'Meniu Threads Sanctionare',
            interaction: interaction,
            components: rows,
            ephemeral: true,
            deferReply: true
        }
    );
};
