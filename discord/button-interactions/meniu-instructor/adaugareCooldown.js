export default {
  name: 'adaugare-cooldown',
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    const targetID = interaction.customId.split('/')[1];

    await utils.discord.selectMenus.sendCertificatChoiceMenuCooldown({
      pulsar: pulsar,
      interaction: interaction,
      menuTitle: 'Adaugare Cooldown Certificat',
      type: 'adaugare-cooldown',
      targetID: targetID
    });
  }
};
