import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendMenuDemitere = async (
  { pulsar, interaction, mongo, targetID }
) => {
  const uID = await pulsar.utilsManager.uniques.createUniqueID();
  const targetProfile = await mongo.getProfile(targetID);

  const nonFormattedButtons = botconfig.demiterePendingMenusButtons.buttons;
  const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
    targetid: targetID,
    uid: uID
  });

  for (let button of buttons) {
    await mongo.createComponent({
      tip_: 'button',
      componentDiscordID: button.id,
      componentID: uID
    });
  }

  const rows = await pulsar.discordManager.menus.createButtonMenu({
    perLine: 2,
    buttons: buttons
  });

  await pulsar.discordManager.embeds.createWarningEmbed(
    'Demitere',
    `Esti sigur ca vrei sa il demiti pe membrul \`${targetProfile.nume} (${targetProfile.callsign})\`?\n\n⚠️ **__Aceasta actiune este ireversibila si toate datele lui/ei vor fi sterse.__**`,
    {
      interaction: interaction,
      components: rows,
      ephemeral: true,
      deferReply: true
    }
  );
};
