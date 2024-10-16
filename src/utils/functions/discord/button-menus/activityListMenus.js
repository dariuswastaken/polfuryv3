import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendListTypeSelectMenu = async (
  { pulsar, interaction, week },
  botconfig
) => {
  const nonFormattedButtons = botconfig.activityListMenusButtons.buttons;
  const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
    week: week
  });

  const rows = await pulsar.discordManager.menus.createButtonMenu({
    perLine: 2,
    buttons: buttons
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege o lista de mai jos.',
    {
      title: 'Meniu Selectare Lista',
      interaction: interaction,
      components: rows,
      ephemeral: true,
      deferReply: true
    }
  );
};
