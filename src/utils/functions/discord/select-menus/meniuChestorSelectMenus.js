module.exports = {
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
  }
};
