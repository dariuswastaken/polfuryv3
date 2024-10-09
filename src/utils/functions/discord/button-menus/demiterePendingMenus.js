const { replaceButtonPlaceholders } = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');


module.exports = {
  sendMenuDemitere: async ({ pulsar, interaction, mongo, targetID }) => {
    const uID = await pulsar.utilsManager.uniques.createUniqueID();
    const targetProfile = await mongo.getProfile(targetID);
    
    const nonFormattedButtons = botconfig.demiterePendingMenusButtons.buttons;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
      targetid: targetID,
      uid: uID
    })
    
    console.log(buttons);
    
    return;

    await mongo.createComponent({
      tip_: 'button',
      componentDiscordID: buttons[0].id,
      componentID: uID
    });
    await mongo.createComponent({
      tip_: 'button',
      componentDiscordID: buttons[1].id,
      componentID: uID
    });

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
  }
};
