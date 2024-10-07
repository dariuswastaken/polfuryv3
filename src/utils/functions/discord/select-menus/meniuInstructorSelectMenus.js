module.exports = {
  sendCertificatChoiceMenuCooldown: async ({ pulsar, interaction, targetID }) => {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'RADIO',
          value: 'radio'
        },
        {
          label: 'MDT',
          value: 'mdt'
        }
      ],
      id: `certificat-cooldown-select/${targetID}`,
      placeholder: 'Alege un certificat'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un certificat din meniul de mai jos.',
      {
        title: 'Meniu Cooldown Certificat',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  
  sendCooldownCertificatDurationSelect: async ({ pulsar, interaction, targetID, certificat }) => {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: '1 zi',
          value: '1'
        },
        {
          label: '2 zile',
          value: '2'
        },
        {
          label: '3 zile',
          value: '3'
        }
      ],
      id: `cooldown-certificat-duration-select/${targetID}/${certificat}`,
      placeholder: 'Alege durata'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege durata din meniul de mai jos.',
      {
        title: 'Meniu Durata Cooldown Certificat',
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  },
  
  sendCertificateChoiceMenu: async ({ pulsar, interaction, menuTitle, type, targetID }) => {
    const menu = await pulsar.discordManager.menus.createSelectMenu({
      type: 'string',
      options: [
        {
          label: 'RADIO',
          value: 'radio'
        },
        {
          label: 'MDT',
          value: 'mdt'
        },
        {
          label: 'MOTO',
          value: 'moto'
        },
        {
          label: 'PILOT',
          value: 'pilot'
        },
        {
          label: 'HIGHSPEED',
          value: 'highspeed'
        }
      ],
      id: `${type}-certificat-select/${targetID}`,
      placeholder: 'Alege un certificat'
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      'Alege un certificat din meniul de mai jos.',
      {
        title: `Meniu ${menuTitle}`,
        interaction: interaction,
        components: [menu],
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
