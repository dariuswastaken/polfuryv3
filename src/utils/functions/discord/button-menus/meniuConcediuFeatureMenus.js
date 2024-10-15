import * as dayConversion from '../../base/dayConversion.js';
import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';
import botconfig from '../../../../botconfig/botconfig.js';

export const sendMenuConcediu = async ({ pulsar, interaction, mongo }) => {
  const currentWeek = await dayConversion.getCurrentWeek();

  let leave = await mongo.getLeave(
    interaction.user.id,
    `${currentWeek[0]} - ${currentWeek[6]}`
  );

  let buttons = [];

  if (leave) {
    const { dayIsChecked, dayNotChecked } = botconfig.meniuConcediuFeatureMenusButtons.loopButtons[0];

    for (let day of currentWeek) {
      const buttonTemplate = leave.days.includes(day)
        ? dayIsChecked
        : dayNotChecked;
      buttons.push(
        replaceButtonPlaceholders(buttonTemplate, {
          targetid: interaction.user.id,
          day: day
        })
      );
    }
  } else {
    const nonFormattedLoopButtons =
      botconfig.meniuConcediuFeatureMenusButtons.loopButtons[0].dayNotChecked;

    for (let day of currentWeek) {
      buttons.push(
        replaceButtonPlaceholders(nonFormattedLoopButtons, {
          targetid: interaction.user.id,
          day: day
        })
      );
    }
  }

  buttons.push(
    replaceButtonPlaceholders(
      botconfig.meniuConcediuFeatureMenusButtons.buttons,
      {
        targetid: interaction.user.id
      }
    )
  );

  buttons = Array.prototype.concat.apply([], buttons);

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
};
