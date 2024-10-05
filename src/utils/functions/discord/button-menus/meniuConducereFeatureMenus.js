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
      }
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
  }
};
