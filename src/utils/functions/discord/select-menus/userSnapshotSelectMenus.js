module.exports = {
  async sendUserSnapshotChoiceMenu({
    pulsar,
    interaction,
    mongo,
    targetID,
    type
  }) {
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
        hour: 'numeric'
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
        title: `${
          type === 'load'
            ? 'Meniu Incarcare Snapshot'
            : 'Meniu Stergere Snapshot'
        }`,
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
