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
  }
};
