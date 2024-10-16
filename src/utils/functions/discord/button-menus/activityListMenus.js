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
  
  console.log(interaction)
  
  const embedConstructor = botconfig.activityListMenusEmbedConstruct.embedConstructor;
  const embed = await replaceEmbedPlaceholders(embedConstructor, {
    interaction: interaction,
    rows: rows
  });
  
  console.log(JSON.stringify(embed.base.interaction, null, 2));

  await pulsar.discordManager.embeds.createDefaultEmbed(embed.description, embed.base);
};
