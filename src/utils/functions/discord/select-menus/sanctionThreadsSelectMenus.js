export const sendSanctionDurationChoiceMenu = async ({
  pulsar,
  interaction,
  sanctionID,
  sanction
}) => {
  const menu = await pulsar.discordManager.menus.createSelectMenu({
    type: 'string',
    options: [
      {
        label: '1 zi',
        value: '1'
      },
      {
        label: '3 zile',
        value: '3'
      },
      {
        label: '7 zile',
        value: '7'
      },
      {
        label: '14 zile',
        value: '14'
      },
      {
        label: '21 zile',
        value: '21'
      },
      {
        label: '30 zile',
        value: '30'
      },
      {
        label: '60 zile',
        value: '60'
      },
      {
        label: 'Permanent',
        value: 'permanent'
      }
    ],
    id: `sanction-duration-select/${sanctionID}/${sanction}`,
    placeholder: 'Alege durata sanctiunii'
  });

  await pulsar.discordManager.embeds.createDefaultEmbed(
    'Alege durata sanctiunii din meniul de mai jos.',
    {
      title: 'Meniu Durata Sanctiuni',
      interaction: interaction,
      components: [menu],
      ephemeral: true,
      deferReply: true
    }
  );
};
