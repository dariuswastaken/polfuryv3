import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendActivityTopMenu = async (
  { pulsar, interaction },
  botconfig
) => {
  const nonFormattedButtons = botconfig.activityTopStatsMenusButtons.buttons;
  const buttons = replaceButtonPlaceholders(nonFormattedButtons, {});

  const rows = await pulsar.discordManager.menus.createButtonMenu({
    perLine: 3,
    buttons: buttons
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    `**Salut, ${interaction.user.username}**\n\nBine ai venit in top activitate.\nAlege una din optiunile de mai jos pentru a continua.`,
    {
      title: 'Meniu Top Activitate',
      interaction: interaction,
      components: rows,
      ephemeral: true,
      deferReply: true
    }
  )
};
