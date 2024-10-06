module.exports = {
  sendMenuInstructor: async ({ pulsar, interaction, mongo, targetID }) => {
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
  }
};
