module.exports = {
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
        label: '➕ Adauga Comisar/Inspector'
      },
      {
        id: `chestor-edit-menu/${targetID}`,
        style: 'Secondary',
        label: '🔧 Edit User'
      },
      {
        id: 'update-activitate',
        style: 'Secondary',
        label: '📅 Updateaza Activitate'
      },
      {
        id: `activitate-snapshot-create`,
        style: 'Secondary',
        label: '📸 Creaza Snapshot Activitate'
      },
      {
        id: `activitate-snapshot-load`,
        style: 'Secondary',
        label: '📥 Incarca Snapshot Activitate'
      },
      {
        id: `activitate-snapshot-delete`,
        style: 'Danger',
        label: '🗑️ Sterge Snapshot Activitate'
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
  }
};
