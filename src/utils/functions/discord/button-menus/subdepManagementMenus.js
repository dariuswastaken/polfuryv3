const {
  replaceButtonPlaceholders
} = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');

module.exports = {
  sendSubdepMenu: async ({ pulsar, interaction, mongo }) => {
    const subdepLeadRoles = {
      Radio: '1199988024851841055',
      Highspeed: '1202382407446315071',
      Moto: '1199988485231226960',
      MDT: '1199988438670262272',
      Pilot: '1199988530626175018',
      Tester: '1199989240616976525'
    };

    const nonFormattedButtons = botconfig.subdepManagementMenusButtons.buttons;

    let buttons = [];
    const member = await interaction.guild.members.fetch(interaction.user.id);
    
    if (member.roles.cache.has(subdepLeadRoles[subdep])) {
      for (let subdep in subdepLeadRoles) {
        const preButtonArray = replaceButtonPlaceholders(
          nonFormattedButtons.subdepMenu.loopedButton,
          {
            subdep: subdep
          }
        );
        buttons.push(preButtonArray);
      }
    }

    if (member.roles.cache.has('1094603192945344522')) {
      buttons = [];
      for (let subdep in subdepLeadRoles) {
        const preButtonArray = replaceButtonPlaceholders(
          nonFormattedButtons.subdepMenu.loopedButton,
          {
            subdep: subdep
          }
        );
        buttons.push(preButtonArray);
      }
    }
    
    buttons = Array.prototype.concat.apply([], buttons);

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un subdepartament din meniul de mai jos.',
      {
        title: 'Meniu Gestionare Subdepartamente',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  sendSubdepSubMenu: async ({ pulsar, interaction, subdep, type }) => {
    const buttons = [
      {
        id: `${type}-menu-instructori`,
        style: 'Secondary',
        label: '📋 Instructori'
      },
      {
        id: `${type}-menu-aplicatii`,
        style: 'Secondary',
        label: '🗒️ Meniu Aplicatii',
        disabled: true
      },
      {
        id: `${type}-menu-add-instr`,
        style: 'Success',
        label: '➕ Adauga Instructori'
      },
      {
        id: `${type}-menu-remove-instr`,
        style: 'Danger',
        label: '➖ Scoate Instructori'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${
        interaction.user.username
      }**\n\nBine ai venit in meniul de gestionare a sub-departamentului **${subdep.toUpperCase()}**.\n- **Mai jos ai toate optiunile disponibile.**`,
      {
        title: `Meniu Gestionare ${subdep}`,
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
