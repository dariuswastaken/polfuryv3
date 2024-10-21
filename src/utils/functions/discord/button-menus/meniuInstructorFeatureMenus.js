import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendMenuInstructor = async ({ pulsar, interaction, mongo, targetID }, botconfig) => {
    const targetProfile = await mongo.getProfile(targetID);

    const nonFormattedButtons = botconfig.meniuInstructorFeatureMenusButtons.buttons;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
        targetid: targetID
    });

    const rows = await pulsar.discordManager.menus.createButtonMenu({
        perLine: 2,
        buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
        `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare a certificatelor.\nAlege una din optiunile de mai jos pentru a continua.\n\n**Membru selectat:** ${targetProfile.nume}\n**Callsign:** ${targetProfile.callsign}`,
        {
            title: 'Meniu Instructor',
            interaction: interaction,
            components: rows,
            ephemeral: true,
            deferReply: true
        }
    );
};
