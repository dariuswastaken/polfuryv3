const { replaceButtonPlaceholders } = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');

module.exports = {
  mphClockInSelect: async ({ pulsar, interaction, type }) => {
    const nonFormattedButtons = botconfig.mphActivityMenusButtons.buttons;
    const buttonOptions = nonFormattedButtons[type];
    
    console.log(nonFormattedButtons)
    console.log(buttonOptions)
    
    const buttons = replaceButtonPlaceholders(buttonOptions, {});
    
    const embedOptions = {
      moto: {
        description: '**Alege tipul de motor de mai jos**',
        title: 'Meniu Selectare Moto'
      },
      highspeed: {
        description: '**Alege tipul de masina de mai jos**',
        title: 'Meniu Selectare Highspeed'
      },
      pilot: {
        description: '**Alege tipul de elicopter de mai jos**',
        title: 'Meniu Selectare Pilot'
      }
    };

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons[type]
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      embedOptions[type].description,
      {
        title: embedOptions[type].title,
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
