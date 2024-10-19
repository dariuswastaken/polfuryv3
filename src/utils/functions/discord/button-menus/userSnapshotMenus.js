import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const sendSnapshotOverview = async (
  { pulsar, interaction, mongo, targetID, snapshotID, type },
  botconfig
) => {
  let snapshot = await mongo.getUserSnapshot(targetID, snapshotID);

  const nonFormattedButtons = botconfig.userSnapshotMenusButtons.buttons;
  const buttons = replaceButtonPlaceholders(nonFormattedButtons, {
    type: type,
    targetid: targetID,
    snapshotid: snapshotID,
    ternary: type === 'load' ? '📥 Incarca Snapshot' : '🗑️ Sterge Snapshot'
  });

  const rows = await pulsar.discordManager.menus.createButtonMenu({
    perLine: 1,
    buttons: buttons
  });

  let certificateList = [];
  for (let certificat of Object.keys(snapshot.userData.certificate)) {
    if (snapshot.userData.certificate[certificat] === true) {
      certificateList.push(certificat.toUpperCase());
    }
  }

  let sanctiuniFormatted = [];

  if (snapshot.userData.sanctiuni.length === 0)
    snapshot.userData.sanctiuni.push('Nici o sanctiune activa.');

  if (sanctiuniFormatted.length === 0)
    sanctiuniFormatted.push('Nici o sanctiune activa.');
  if (snapshot.userData.functii.length === 0)
    snapshot.userData.functii.push('Nici o functie.');
  if (snapshot.userData.notite.length === 0)
    snapshot.userData.notite.push('Nici o notita.');

  let title = `Esti sigur ca vrei sa **${
    type === 'load' ? 'incarci' : 'stergi'
  } acest snapshot?**`;

  const snapshotDate = new Date(snapshot.snapshotDate).toLocaleDateString(
    'ro-RO',
    {
      timeZone: 'Europe/Bucharest',
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      minute: 'numeric',
      hour: 'numeric'
    }
  );

  await pulsar.discordManager.embeds.createEmbed({
    title: title,
    footer: { text: `Snapshot ${snapshotID} | Creat ${snapshotDate}` },
    fields: [
      {
        name: 'NUME',
        value: `${snapshot.userData.nume}`,
        inline: true
      },
      {
        name: 'CALLSIGN',
        value: `${snapshot.userData.callsign}`,
        inline: true
      },
      {
        name: 'GRAD',
        value: `${snapshot.userData.grad}`,
        inline: true
      },
      {
        name: 'ID',
        value: `${snapshot.userData.IDServer}`,
        inline: true
      },
      {
        name: 'DATA INTRARE',
        value: `${snapshot.userData.dataIntrare}`,
        inline: true
      },
      {
        name: 'ULTIMA ACTUALIZARE',
        value: `${snapshot.userData.dataActualizare}`,
        inline: true
      },
      {
        name: 'ON-DUTY?',
        value: `-`,
        inline: true
      },
      {
        name: 'AVERTISMENTE',
        value: `${snapshot.userData.avertismente}`,
        inline: true
      },
      {
        name: 'CERTIFICATE',
        value: `\`\`\`\n${certificateList.join(' / ')}\`\`\``,
        inline: true
      },
      {
        name: 'FUNCTII',
        value: `\`\`\`\n${snapshot.userData.functii.join('\n')}\n\`\`\``,
        inline: true
      },
      {
        name: 'SANCTIUNI',
        value: `\`\`\`\n${snapshot.userData.sanctiuni.join('\n')}\n\`\`\``,
        inline: false
      },
      {
        name: 'NOTITE',
        value: `\`\`\`\n${snapshot.userData.notite.join('\n')}\n\`\`\``,
        inline: false
      }
    ],
    interaction: interaction,
    deferReply: true,
    ephemeral: true,
    components: rows
  });
};
