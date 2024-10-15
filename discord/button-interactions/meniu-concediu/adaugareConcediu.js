export default {
  name: 'concediu',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const day = interaction.customId.split('/')[2];
    const week = await utils.dayConversion.getCurrentWeek();

    let leave = await mongo.getLeave(
      interaction.user.id,
      `${week[0]} - ${week[6]}`
    );
    if (!leave) leave = { days: [] };

    if (day === 'all') {
      if (leave.days.length >= 7) {
        await utils.discord.errors.noDaysLeftError(pulsar, interaction);
        return;
      }

      await mongo.createLeave(interaction.user.id, week, 'all');
      await utils.discord.embeds.sendSuccessEmbed(
        'Zilele au fost adaugate cu succes.',
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    } else {
      if (leave.days.includes(day)) {
        await utils.discord.errors.hasDayAlreadyError(pulsar, interaction);
        return;
      }
      await mongo.createLeave(interaction.user.id, day, 'normal');
      await utils.discord.embeds.sendSuccessEmbed(
        `Ziua **${day}** a fost adaugata cu succes.`,
        {
          pulsar: pulsar,
          interaction: interaction
        }
      );
    }
  }
};
