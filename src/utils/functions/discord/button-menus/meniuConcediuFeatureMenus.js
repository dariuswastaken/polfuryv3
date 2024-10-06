const dayConversion = require('../../base/dayConversion');

module.exports = {
  sendMenuConcediu: async ({ pulsar, interaction, mongo }) => {
    const currentWeek = await dayConversion.getCurrentWeek();

    let leave = await mongo.getLeave(
      interaction.user.id,
      `${currentWeek[0]} - ${currentWeek[6]}`
    );

    const buttons = [];

    if (leave) {
      for (let day of currentWeek) {
        if (leave.days.includes(day)) {
          buttons.push({
            id: `concediu/${interaction.user.id}/${day}`,
            style: 'Danger',
            label: `📅 ${day}`,
            disabled: true
          });
        } else {
          buttons.push({
            id: `concediu/${interaction.user.id}/${day}`,
            style: 'Success',
            label: `📅 ${day}`
          });
        }
      }
    } else {
      for (let day of currentWeek) {
        buttons.push({
          id: `concediu/${interaction.user.id}/${day}`,
          style: 'Success',
          label: `📅 ${day}`
        });
      }
    }

    buttons.push(
      {
        id: `concediu/${interaction.user.id}/all`,
        style: 'Secondary',
        label: '➕ Toata Saptamana'
      },
      {
        id: `adaugare-motiv-concediu/${interaction.user.id}/`,
        style: 'Secondary',
        label: '🗒️ Adaugare Motiv'
      }
    );

    const rows = await pulsar.discordManager.menus.createButtonMenu({
      perLine: 3,
      buttons: buttons
    });

    if (!leave) leave = { days: [] };

    await pulsar.discordManager.embeds.createDefaultEmbed(
      `**Salut, ${interaction.user.username}**\n\nBine ai venit in meniul de concedii.\n- Pentru a adauga zile de concediu, foloseste butoanele catalogate cu formatul DD.MM.YYYY de mai jos.\n- Pentru a adauga automat toata saptamana, apasa pe **"➕ Toata Saptamana"**\n- Apasa pe **"🗒️ Adaugare Motiv"** pentru a adauga un motiv de concediu **(OBLIGATORIU)**.\n- **Concediul se va lua in considerare doar daca motivul este setat.**`,
      {
        title: 'Meniu Concediu',
        fields: [
          {
            name: 'Zile Concediu',
            value: `${leave.days.length} zile`,
            inline: true
          }
        ],
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
      }
    );
  }
};
