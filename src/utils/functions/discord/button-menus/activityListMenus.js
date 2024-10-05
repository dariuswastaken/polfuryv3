module.exports = {
  async sendListTypeSelectMenu({ pulsar, interaction, week }) {
    const buttons = [
      {
        id: `up-list/${week}`,
        style: 'Secondary',
        label: '🗒️ Lista UP'
      },
      {
        id: `out-list/${week}`,
        style: 'Secondary',
        label: '🗒️ Lista OUT'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o lista de mai jos.',
      {
        title: 'Meniu Selectare Lista',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
