const {
  replaceButtonPlaceholders
} = require('../../../../core/placeholderModifier.js');
const botconfig = require('../../../../botconfig/botconfig.js');

module.exports = {
  sendSubdepMenu: async ({ pulsar, interaction, mongo }) => {
    const subdepLeadRoles = {
      Radio: {
        roleID: '1199988024851841055',
        subdepName: 'Radio'
      },
      Highspeed: {
        roleID: '1202382407446315071',
        subdepName: 'Highspeed'
      },
      Moto: {
        roleID: '1199988485231226960',
        subdepName: 'Moto'
      },
      MDT: {
        roleID: '1199988438670262272',
        subdepName: 'MDT'
      },
      Pilot: {
        roleID: '1199988530626175018',
        subdepName: 'Pilot'
      },
      Tester: {
        roleID: '1199989240616976525',
        subdepName: 'Tester'
      }
    };

    const nonFormattedButtons = botconfig.subdepManagementMenusButtons;

    let buttons = [];
    const member = await interaction.guild.members.fetch(interaction.user.id);

    for (let subdep in subdepLeadRoles) {
      if (member.roles.cache.has(subdepLeadRoles[subdep].roleID)) {
        const preButtonArray = replaceButtonPlaceholders(
          nonFormattedButtons.subdepMenu.loopedButton,
          {
            subdep: subdepLeadRoles[subdep].subdepName.toLowerCase(),
            subdepCapitalized: subdepLeadRoles[subdep].subdepName
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
            subdep: subdepLeadRoles[subdep].subdepName.toLowerCase(),
            subdepCapitalized: subdepLeadRoles[subdep].subdepName
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
