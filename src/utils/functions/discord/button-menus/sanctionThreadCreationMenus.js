module.exports = {
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
  }
};
