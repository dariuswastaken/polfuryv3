import { replaceButtonPlaceholders, replaceEmbedPlaceholders } from '../../../../core/placeholderModifier.js';

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
  
  const embedConstructor = botconfig.activityListMenusEmbedConstruct.embedConstructor;
  const embed = replaceEmbedPlaceholders(embedConstructor, {
    interaction: interaction,
    rows: rows
  });

  console.log(embed);
  
  await pulsar.discordManager.embeds.createDefaultEmbed(embed.description, embed.base);
};
