module.exports = {
  async sendActivityWeekChoiceMenu({ pulsar, interaction, mongo, targetID }) {
    const weeks = await mongo.getAllActivity(targetID);
    let options = [];
    for (let week of weeks) {
      options.push({
        label: `${week.perioada}`,
        value: `${week.perioada}`
      });
    }

    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: options,
      id: `activitate-select/${targetID}`,
      placeholder: 'Alege o saptamana'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o saptamana din meniul de mai jos.',
      {
        title: 'Meniu Activitate',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendRankChoiceMenu({ pulsar, interaction, targetID }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'Agent Sef Principal',
          value: 'Agent Sef Principal'
        },
        {
          label: 'Agent Principal',
          value: 'Agent Principal'
        },
        {
          label: 'Agent',
          value: 'Agent'
        },
        {
          label: 'Cadet',
          value: 'Cadet'
        }
      ],
      id: `schimbare-grad-select/${targetID}`,
      placeholder: 'Alege un grad'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un grad din meniul de mai jos.',
      {
        title: 'Meniu Schimbare Grad',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendChestorRankChoiceMenu({ pulsar, interaction, targetID }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'Comisar',
          value: 'Comisar'
        },
        {
          label: 'Inspector',
          value: 'Inspector'
        }
      ],
      id: `chestor-schimbare-grad-select/${targetID}`,
      placeholder: 'Alege un grad'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un grad din meniul de mai jos.',
      {
        title: 'Meniu Chestor Schimbare Grad',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendCertificateChoiceMenu({
    pulsar,
    interaction,
    menuTitle,
    type,
    targetID
  }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'RADIO',
          value: 'radio'
        },
        {
          label: 'MDT',
          value: 'mdt'
        },
        {
          label: 'MOTO',
          value: 'moto'
        },
        {
          label: 'PILOT',
          value: 'pilot'
        },
        {
          label: 'HIGHSPEED',
          value: 'highspeed'
        }
      ],
      id: `${type}-certificat-select/${targetID}`,
      placeholder: 'Alege un certificat'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un certificat din meniul de mai jos.',
      {
        title: `Meniu ${menuTitle}`,
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendWeekChoiceMenu({ pulsar, interaction, mongo }) {
    const activityWeeks = await mongo.getAllActivityWeeks();
    let options = [];
    for (let week of activityWeeks) {
      options.push({
        label: `${week}`,
        value: `${week}`
      });
    }
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: options,
      id: `creare-lista-week-select/${interaction.user.id}`,
      placeholder: 'Alege o saptamana'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o saptamana din meniul de mai jos.',
      {
        title: 'Creare Lista Activitate',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendListWeekChoiceMenu({ pulsar, interaction, mongo }) {
    const activityWeeks = await mongo.getAllActivityWeeks();
    let options = [];
    for (let week of activityWeeks) {
      options.push({
        label: `${week}`,
        value: `${week}`
      });
    }
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: options,
      id: `list-select/${interaction.user.id}`,
      placeholder: 'Alege o saptamana'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o saptamana din meniul de mai jos.',
      {
        title: 'Meniu Selectare Saptamana - Liste',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendListDeleteWeekChoiceMenu({ pulsar, interaction, mongo }) {
    const activityWeeks = await mongo.getAllActivityWeeks();
    let options = [];
    for (let week of activityWeeks) {
      options.push({
        label: `${week}`,
        value: `${week}`
      });
    }
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: options,
      id: `list-delete-select/${interaction.user.id}`,
      placeholder: 'Alege o saptamana'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o saptamana din meniul de mai jos.',
      {
        title: 'Meniu Selectare Saptamana - Stergere Liste',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendSanctionDurationChoiceMenu({
    pulsar,
    interaction,
    sanctionID,
    sanction
  }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: '1 zi',
          value: '1'
        },
        {
          label: '3 zile',
          value: '3'
        },
        {
          label: '7 zile',
          value: '7'
        },
        {
          label: '14 zile',
          value: '14'
        },
        {
          label: '21 zile',
          value: '21'
        },
        {
          label: '30 zile',
          value: '30'
        },
        {
          label: '60 zile',
          value: '60'
        },
        {
          label: 'Permanent',
          value: 'permanent'
        }
      ],
      id: `sanction-duration-select/${sanctionID}/${sanction}`,
      placeholder: 'Alege durata sanctiunii'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege durata sanctiunii din meniul de mai jos.',
      {
        title: 'Meniu Durata Sanctiunii',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendCertificatChoiceMenuCooldown({ pulsar, interaction, targetID }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'RADIO',
          value: 'radio'
        },
        {
          label: 'MDT',
          value: 'mdt'
        }
      ],
      id: `certificat-cooldown-select/${targetID}`,
      placeholder: 'Alege un certificat'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un certificat din meniul de mai jos.',
      {
        title: 'Meniu Cooldown Certificat',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendCooldownCertificatDurationSelect({
    pulsar,
    interaction,
    targetID,
    certificat
  }) {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: '1 zi',
          value: '1'
        },
        {
          label: '2 zile',
          value: '2'
        },
        {
          label: '3 zile',
          value: '3'
        }
      ],
      id: `cooldown-certificat-duration-select/${targetID}/${certificat}`,
      placeholder: 'Alege durata'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege durata din meniul de mai jos.',
      {
        title: 'Meniu Durata Cooldown Certificat',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  async sendUserSnapshotChoiceMenu({ pulsar, interaction, mongo, targetID, type }) {
    const snapshots = await mongo.getUserSnapshots(targetID);

    let options = [];
    for (let snapshot of snapshots) {
      const date = new Date(snapshot.snapshotDate).toLocaleDateString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
      });
      options.push({
        label: `${snapshot.snapshotID} / ${date}`,
        value: `${snapshot.snapshotID}`
      });
    }

    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: options,
      id: `user-snapshot-select-${type}/${targetID}`,
      placeholder: 'Alege un snapshot'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un snapshot din meniul de mai jos.',
      {
        title: `${type === 'load' ? 'Meniu Incarcare Snapshot' : 'Meniu Stergere Snapshot'}`,
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
