module.exports = {
  mphClockInSelect: async ({ pulsar, interaction, type }) => {
    const buttons = {
      moto: [
        {
          id: 'moto-choice/offroad',
          label: '🏍️ Offroad',
          style: 'Secondary'
        },
        {
          id: 'moto-choice/speed',
          label: '🏍️ Speed',
          style: 'Secondary'
        }
      ],
      highspeed: [
        {
          id: 'highspeed-choice/mustang',
          label: '🚓 Ford Mustang',
          style: 'Secondary'
        },
        {
          id: 'highspeed-choice/porsche',
          label: '🚓 Porsche Cayman',
          style: 'Secondary'
        },
        {
          id: 'highspeed-choice/viper',
          label: '🚓 Dodge Viper',
          style: 'Secondary'
        },
        {
          id: 'highspeed-choice/lotus',
          label: '🚓 Lotus Exige',
          style: 'Secondary'
        }
      ],
      pilot: [
        {
          id: 'pilot-choice/as350',
          label: '🚁 AS 350 (Maverick)',
          style: 'Secondary'
        }
      ]
    };

    const embedOptions = {
      moto: {
        description: '**Alege tipul de motor de mai jos**',
        title: 'Meniu Selectare Moto'
      },
      highspeed: {
        description: '**Alege tipul de masina de mai jos**',
        title: 'Meniu Selectare Highspeed'
      },
      pilot: {
        description: '**Alege tipul de elicopter de mai jos**',
        title: 'Meniu Selectare Pilot'
      }
    };

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 2,
      buttons: buttons[type]
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(
      embedOptions[type].description,
      {
        title: embedOptions[type].title,
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
