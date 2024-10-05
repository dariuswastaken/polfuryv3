module.exports = {
  async sendCertificatChoiceMenuCooldown({ pulsar, interaction, targetID }) {
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
  async sendCooldownCertificatDurationSelect({
    pulsar,
    interaction,
    targetID,
    certificat
  }) {
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
  }
};
