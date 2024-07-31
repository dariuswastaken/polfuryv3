const dayConversion = require('../dayConversion');

module.exports = {
  async sendMenuConducere({ pulsar, interaction, mongo, targetID }) {
    const targetProfile = await mongo.getProfile(targetID);
    const buttons = [
      {
        id: `activitate/${targetID}`,
        style: 'Secondary',
        label: '📅 Activitate'
      },
      {
        id: `informatii/${targetID}`,
        style: 'Secondary',
        label: '👤 Informatii'
      },
      {
        id: `schimbare-grad/${targetID}`,
        style: 'Secondary',
        label: '🔃 Schimbare Grad'
      },
      {
        id: `adauga-notita/${targetID}`,
        style: 'Secondary',
        label: '🗒️ Adauga Notita',
        disabled: true
      },
      {
        id: `statistici-globale/${targetID}`,
        style: 'Secondary',
        label: '📊 Statistici Globale',
        disabled: true
      },
      {
        id: `top-activitate/${targetID}`,
        style: 'Secondary',
        label: '📈 Top Activitate',
        disabled: true
      },
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare pentru conducere.\nAlege una din optiunile de mai jos pentru a continua.\n\n**Membru selectat:** ${targetProfile.nume}\n**Callsign:** ${targetProfile.callsign}`,
      {
        title: 'Meniu Conducere',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendMenuChestor({ pulsar, interaction, mongo, targetID }) {
    const targetProfile = await mongo.getProfile(targetID);
    const buttons = [
      {
        id: `chestor-creare-lista/${targetID}`,
        style: 'Success',
        label: '📋 Creare Lista'
      },
      {
        id: `chestor-stergere-lista/${targetID}`,
        style: 'Danger',
        label: '📤 Stergere Lista'
      },
      {
        id: `chestor-liste/${targetID}`,
        style: 'Secondary',
        label: '📜 Liste'
      },
      {
        id: `chestor-adauga-ci/${targetID}`,
        style: 'Secondary',
        label: '➕ Adauga Comisar/Inspector',
        disabled: true
      },
      {
        id: `chestor-edit-menu/${targetID}`,
        style: 'Secondary',
        label: '🔧 Edit User',
        disabled: true
      },
      {
        id: 'update-activitate',
        style: 'Secondary',
        label: '📅 Updateaza Activitate'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare a departamentului.\nAlege una din optiunile de mai jos pentru a continua.\n\n**Membru selectat:** ${targetProfile.nume}\n**Callsign:** ${targetProfile.callsign}`,
      {
        title: 'Meniu Chestor',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendMenuDemitere({ pulsar, interaction, mongo, targetID }) {
    const uID = await pulsar.utilsManager.uniques.createUniqueID();
    const targetProfile = await mongo.getProfile(targetID);
    const buttons = [
      {
        id: `menu-demitere/confirm/${targetID}/${uID}`,
        style: 'Danger',
        label: '✅ Confirmare'
      },
      {
        id: `menu-demitere/cancel/${targetID}/${uID}`,
        style: 'Secondary',
        label: '❌ Anulare'
      }
    ];

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
  },
  async sendMenuInstructor({ pulsar, interaction, mongo, targetID }) {
    const targetProfile = await mongo.getProfile(targetID);
    const buttons = [
      {
        id: `adaugare-certificat/${targetID}`,
        style: 'Secondary',
        label: '📥 Adauga Certificate'
      },
      {
        id: `stergere-certificat/${targetID}`,
        style: 'Secondary',
        label: '📤 Sterge Certificate'
      },
      {
        id: `adaugare-cooldown/${targetID}`,
        style: 'Secondary',
        label: '⏲️ Adauga Cooldown'
      },
      {
        id: `lista-cooldowns/${targetID}`,
        style: 'Secondary',
        label: '⏲️ Lista Cooldown-uri'
      },
      {
        id: `adaugare-interdictie/${targetID}`,
        style: 'Danger',
        label: '🚫 Adauga Interdictie',
        disabled: true
      },
      {
        id: `lista-interdictii/${targetID}`,
        style: 'Danger',
        label: '🚫 Lista Interdictii',
        disabled: true
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare a certificatelor.\nAlege una din optiunile de mai jos pentru a continua.\n\n**Membru selectat:** ${targetProfile.nume}\n**Callsign:** ${targetProfile.callsign}`,
      {
        title: 'Meniu Instructor',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendMenuConcediu({ pulsar, interaction, mongo }) {
    const currentWeek = await dayConversion.getCurrentWeek();

    let leave = await mongo.getLeave(
      interaction.user.id,
      `${currentWeek[0]} - ${currentWeek[6]}`
    );

    const buttons = [];

    if (leave) {
      for (let day of currentWeek) {
        if (leave.days.includes(day)) {
          buttons.push({
            id: `concediu/${interaction.user.id}/${day}`,
            style: 'Danger',
            label: `📅 ${day}`,
            disabled: true
          });
        } else {
          buttons.push({
            id: `concediu/${interaction.user.id}/${day}`,
            style: 'Success',
            label: `📅 ${day}`
          });
        }
      }
    } else {
      for (let day of currentWeek) {
        buttons.push({
          id: `concediu/${interaction.user.id}/${day}`,
          style: 'Success',
          label: `📅 ${day}`
        });
      }
    }

    buttons.push(
      {
        id: `concediu/${interaction.user.id}/all`,
        style: 'Secondary',
        label: '➕ Toata Saptamana'
      },
      {
        id: `adaugare-motiv-concediu/${interaction.user.id}/`,
        style: 'Secondary',
        label: '🗒️ Adaugare Motiv'
      }
    );

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    if (!leave) leave = { days: [] };

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de concedii.\n- Pentru a adauga zile de concediu, foloseste butoanele catalogate cu formatul DD.MM.YYYY de mai jos.\n- Pentru a adauga automat toata saptamana, apasa pe **"➕ Toata Saptamana"**\n- Apasa pe **"🗒️ Adaugare Motiv"** pentru a adauga un motiv de concediu **(OBLIGATORIU)**.\n- **Concediul se va lua in considerare doar daca motivul este setat.**`,
      {
        title: 'Meniu Concediu',
        fields: [
          {
            name: 'Zile Concediu',
            value: `${leave.days.length} zile`,
            inline: true
          }
        ],
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendSanctionMenu({ pulsar, interaction, mongo, targetID, sanctionID }) {
    const buttons = [
      {
        id: `sanction-select/${targetID}/${sanctionID}/ts25`,
        style: 'Secondary',
        label: '✂️ Taiere Salariala 25%'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/ts50`,
        style: 'Secondary',
        label: '✂️ Taiere Salariala 50%'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/ts75`,
        style: 'Secondary',
        label: '✂️ Taiere Salariala 75%'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/suspendareup`,
        style: 'Secondary',
        label: '⛔ Suspendare UP'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/suspendaresias`,
        style: 'Secondary',
        label: '⛔ Suspendare SIAS'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/pifd`,
        style: 'Secondary',
        label: '🚓 Punere in folosul Dep.'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/av`,
        style: 'Secondary',
        label: '⚠️ Avertisment'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/down`,
        style: 'Danger',
        label: '⬇️ Down'
      },
      {
        id: `sanction-select/${targetID}/${sanctionID}/demitere`,
        style: 'Danger',
        label: '👋 Demitere'
      },
      {
        id: `sanction-confirm/${targetID}/${sanctionID}`,
        style: 'Success',
        label: '✅ Confirmare'
      }
    ];

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
  },
  async sendSubdepMenu({ pulsar, interaction, mongo }) {
    const subdepLeadRoles = {
      Radio: '1199988024851841055',
      Highspeed: '1202382407446315071',
      Moto: '1199988485231226960',
      MDT: '1199988438670262272',
      Pilot: '1199988530626175018',
      Tester: '1199989240616976525',
    };

    let buttons = [];
    const member = await interaction.guild.members.fetch(interaction.user.id);
    for (let subdep in subdepLeadRoles) {
      if (member.roles.cache.has(subdepLeadRoles[subdep])) {
        buttons.push({
          id: `${subdep.toLowerCase()}-menu`,
          style: 'Secondary',
          label: `🛠️ ${subdep}`
        });
      }
    }

    if (member.roles.cache.has('1094603192945344522')) {
      buttons = [];
      for (let subdep in subdepLeadRoles) {
        buttons.push({
          id: `${subdep.toLowerCase()}-menu`,
          style: 'Secondary',
          label: `🛠️ ${subdep}`
        });
      }
    }

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
  async sendSubdepSubMenu({ pulsar, interaction, subdep, type }) {
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
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de gestionare a sub-departamentului **${subdep.toUpperCase()}**.\n- **Mai jos ai toate optiunile disponibile.**`,
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
