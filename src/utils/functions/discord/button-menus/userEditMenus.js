module.exports = {
  sendUserEditMenu: async ({ pulsar, interaction, targetID }) => {
    const buttons = [
      {
        id: `edit-user-name/${targetID}`,
        style: 'Secondary',
        label: '✏️ Nume'
      },
      {
        id: `edit-user-idserver/${targetID}`,
        style: 'Secondary',
        label: '✏️ ID Server'
      },
      {
        id: `edit-user-id/${targetID}`,
        style: 'Danger',
        label: '✏️ ID Discord'
      },
      {
        id: `edit-user-data-intrare/${targetID}`,
        style: 'Secondary',
        label: '✏️ Data Intrare'
      },
      {
        id: `edit-user-scoatere-av/${targetID}`,
        style: 'Secondary',
        label: '✏️ Scoate Avertisment'
      },
      {
        id: `edit-user-delete/${targetID}`,
        style: 'Danger',
        label: '🗑️ Sterge User'
      },
      {
        id: `edit-user-snapshot/${targetID}`,
        style: 'Success',
        label: '📸 Creeaza Snapshot'
      },
      {
        id: `edit-user-snapshot-load/${targetID}`,
        style: 'Secondary',
        label: '📥 Incarca Snapshot'
      },
      {
        id: `edit-user-snapshot-delete/${targetID}`,
        style: 'Secondary',
        label: '🗑️ Sterge Snapshot'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege o optiune de mai jos.',
      {
        title: 'Meniu Editare User',
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  },

  sendMenuDeleteUser: async ({ pulsar, interaction, mongo, targetID }) => {
    const uID = await pulsar.utilsManager.uniques.createUniqueID();
    const targetProfile = await mongo.getProfile(targetID);
    const buttons = [
      {
        id: `menu-delete-user/confirm/${targetID}/${uID}`,
        style: 'Danger',
        label: '✅ Confirmare'
      },
      {
        id: `menu-delete-user/cancel/${targetID}/${uID}`,
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
      'Sterge User',
      `Esti sigur ca vrei sa stergi userul \`${targetProfile.nume} (${targetProfile.callsign})\`?\n\n⚠️ **__Aceasta actiune este ireversibila si toate datele lui/ei vor fi sterse.__**\n\n**Poti creea un snapshot pentru a avea un backup.**`,
      {
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
