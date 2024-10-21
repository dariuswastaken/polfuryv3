import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendMenuChestor = async ({ pulsar, interaction, mongo, targetID }, botconfig) => {
    const targetProfile = await mongo.getProfile(targetID);

    const nonFormattedButtons = botconfig.meniuChestorFeatureMenusButtons.buttons;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
        targetid: targetID
    });

    const rows = await pulsar.discordManager.menus.createButtonMenu({
        perLine: 3,
        buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
        `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare a departamentului.\nAlege una din optiunile de mai jos pentru a continua.\n\n**Membru selectat:** ${targetProfile.nume}\n**Callsign:** ${targetProfile.callsign}`,
        {
            title: 'Meniu Chestor',
            interaction: interaction,
            components: rows,
            ephemeral: true,
            deferReply: true
        }
    );
};
