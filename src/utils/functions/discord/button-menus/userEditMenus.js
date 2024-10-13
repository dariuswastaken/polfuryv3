const { replaceButtonPlaceholders } = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');

module.exports = {
  sendUserEditMenu: async ({ pulsar, interaction, targetID }) => {
    const nonFormattedButtons = botconfig.userEditMenusButtons.buttons.editMenu;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
      targetid: targetID
    });

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o optiune de mai jos.',
      {
        title: 'Meniu Editare User',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  sendMenuDeleteUser: async ({ pulsar, interaction, mongo, targetID }) => {
    const uID = await pulsar.utilsManager.uniques.createUniqueID();
    const targetProfile = await mongo.getProfile(targetID);
    
    const nonFormattedButtons = botconfig.userEditMenusButtons.buttons.deleteUser;
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
      'Sterge User',
      `Esti sigur ca vrei sa stergi userul \`${targetProfile.nume} (${targetProfile.callsign})\`?\n\n⚠️ **__Aceasta actiune este ireversibila si toate datele lui/ei vor fi sterse.__**\n\n**Poti creea un snapshot pentru a avea un backup.**`,
      {
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
