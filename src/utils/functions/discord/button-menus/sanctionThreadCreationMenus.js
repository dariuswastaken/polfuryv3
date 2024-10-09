const { replaceButtonPlaceholders } = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');

module.exports = {
  sendSanctionMenu: async ({ pulsar, interaction, mongo, targetID, sanctionID }) => {
    
    const nonFormattedButtons = botconfig.sanctionThreadCreationMenusButtons.buttons;
    const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
      targetid: targetID,
      sanctionid: sanctionID
    });
    
    console.log(buttons);

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
  }
};
