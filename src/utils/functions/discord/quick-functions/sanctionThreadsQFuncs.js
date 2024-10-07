const {
  ThreadAutoArchiveDuration,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  createSanctionThread: async ({ pulsar, utils, interaction, mongo, sanction, reason }) => {
    const forum = await interaction.guild.channels.cache.get(
      '1205145266349670440'
    );

    const buttons = [
      {
        id: `sanction-thread-send/${sanction.sanctionID}`,
        style: 'Success',
        label: '📩 Trimite Sanctiunea'
      },
      {
        id: `sanction-thread-cancel/${sanction.sanctionID}`,
        style: 'Danger',
        label: '❌ Anuleaza Sanctiunea'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons
    });

    await mongo.closeSanctionList(sanction.sanctionID);

    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSanctions = [];
    for (let sanc of sanction.sanctions) {
      formattedSanctions.push(
        `${sanctionKeys[sanc.split(' - ')[0]]} - ${sanc.split(' - ')[1]}`
      );
    }

    const sanctionedProfile = await mongo.getProfile(sanction.sanctionedID);
    const embed = await pulsar.discordManager.embeds.createForumThreadEmbed({
      guild: interaction.guild,
      components: rows,
      title: `Sanctiune ${sanctionedProfile.nume} | ID Sanctiune: ${sanction.sanctionID}`,
      description: `**Nume sanctionat/a:** ${
        sanctionedProfile.nume
      }\n**Callsign:** ${sanctionedProfile.callsign}\n**ID Sanctionat/a:** ${
        sanctionedProfile.IDServer
      }\n**ID Discord:** ${
        sanctionedProfile.IDDiscord
      }\n\n**Sanctiuni:**\n\`\`\`${formattedSanctions.join(
        '\n'
      )}\`\`\`\n\n**Motiv:** ${reason}\n**Autor:** ${
        interaction.user.username
      } (${interaction.user.id})`
    });

    await forum.threads.create({
      name: `Sanctiune ${sanctionedProfile.nume} | ID Sanctiune: ${sanction.sanctionID}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
      reason: `Sanction ID: ${sanction.sanctionID} - Autor => ${interaction.user.username} (${interaction.user.id})`,
      message: {
        embeds: [embed.embeds],
        components: embed.components
      }
    });

    await utils.discord.embeds.sendSuccessEmbed(
      'Thread-ul a fost creat cu succes.',
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  },
  
  addSanctionToMember: async ({ pulsar, mongo, userID, sanctions }) => {
    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSancList = [];
    for (let sanc of sanctions) {
      let sancKey = sanctionKeys[sanc.split(' - ')[0]];
      if (sancKey !== 'Avertisment') {
        let expiryDate = sanc.split(' - ')[1];
        if (expiryDate === 'Permanent') {
          formattedSancList.push(`${sancKey} - Permanent`);
        } else {
          let date = new Date();
          date.setDate(date.getDate() + parseInt(expiryDate));
          let expDate = await pulsar.utilsManager.time.formatTimestamp(
            date,
            'Europe/Bucharest'
          );
          formattedSancList.push(`${sancKey} - ${expDate}`);
        }
      } else if (sancKey === 'Avertisment') {
        await mongo.addAvM(userID);
      }
    }

    await mongo.addSanctionsM(userID, formattedSancList);
  },
  
  createSanctionPrivateChannel: async ({ pulsar, interaction, mongo, sanctionID }) => {
    const sanction = await mongo.getSanction(sanctionID);
    const sanctionedProfile = await mongo.getProfile(sanction.sanctionedID);

    const sanctionedMember = await interaction.guild.members.fetch(
      sanction.sanctionedID
    );

    const channel = await interaction.guild.channels.create({
      name: `sanctiune-${sanctionedProfile.nume}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: sanctionedMember.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    const buttons = [
      {
        id: `close-sanction-channel/${sanctionedProfile.IDDiscord}/${sanctionID}`,
        style: 'Primary',
        label: '✅ Am inteles'
      }
    ];

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 1,
      buttons: buttons
    });

    const sanctionKeys = {
      ts25: 'Taiere Salariala 25%',
      ts50: 'Taiere Salariala 50%',
      ts75: 'Taiere Salariala 75%',
      suspendareup: 'Suspendare UP',
      suspendaresias: 'Suspendare SIAS',
      pifd: 'Punere in folosul Dep.',
      av: 'Avertisment',
      down: 'Down',
      demitere: 'Demitere'
    };

    const formattedSanctions = [];
    for (let sanc of sanction.sanctions) {
      formattedSanctions.push(
        `${sanctionKeys[sanc.split(' - ')[0]]} - ${sanc.split(' - ')[1]}`
      );
    }

    await channel.send({ content: `<@${sanctionedProfile.IDDiscord}>` });
    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Acesta este un mesaj automat, mai jos ai detaliile sanctiunii.**\n**Daca ai nelamuriri, poti da tag persoanei responsabile pentru sanctiunea ta.**\n\n**Sanctionat/a de:** <@${
        sanction.authorID
      }>\n**Motiv:** ${
        sanction.reason
      }\n\n**Sanctiuni:**\n\n\`\`\`\n${formattedSanctions.join('\n')}\`\`\``,
      {
        guild: interaction.guild,
        channel: channel.id,
        title: `Sanctiune ${sanctionedProfile.nume}`,
        footer: { text: `ID Sanctiune: ${sanction.sanctionID}` },
        components: rows
      }
    );
  }
};
