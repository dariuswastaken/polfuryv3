module.exports = {
  async sendUserCooldownList({ pulsar, interaction, mongo, targetID }) {
    const userCooldowns = await mongo.getCooldowns(targetID);

    let fields = [];
    for (let cooldown of userCooldowns) {
      const expirationDate = new Date(cooldown.expiration);
      if (expirationDate.getTime() > Date.now()) {
        let formattedDate = await pulsar.utilsManager.time.formatTimestamp(
          expirationDate,
          'Europe/Bucharest'
        );
        fields.push({
          name: `Cooldown ${cooldown.tip_.toUpperCase()}`,
          value: `Expira pe data de ${formattedDate}`,
          inline: true
        });
      }
    }

    await pulsar.discordManager.embeds.createEmbed({
      fields: fields,
      description: '**Lista Cooldown-uri**',
      interaction: interaction,
      deferReply: true,
      ephemeral: true
    });
  }
};
