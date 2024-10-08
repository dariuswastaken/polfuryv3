const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gen-token')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Genereaza un token de intrare pentru o persoana')
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('ID-ul de discord al persoanei')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('tip')
        .setDescription('tipul intrari (reintegrare/default)')
        .setRequired(false)
    ),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    let id = interaction.options.getString('id');
    let tip = interaction.options.getString('tip') || 'default';

    if (tip.toLowerCase() !== 'default' && tip.toLowerCase() !== 'reintegrare') {
      tip = 'default';
    }

    tip = tip.toLowerCase();

    let tokenType;
    switch (tip) {
      case 'default':
        tokenType = 'def';
        break;
      case 'reintegrare':
        tokenType = 're';
        break;
    }

    const token = await pulsar.utilsManager.uniques.generateToken(
      48,
      tokenType
    );
    await mongo.createToken(token, id, tip, interaction.user.id);

    const tokenData = await mongo.getToken(token);
    const expiryDate = await pulsar.utilsManager.time.formatTimestamp(
      tokenData.expiresAt,
      'Europe/Bucharest'
    );

    await utils.discord.embeds.sendSuccessEmbed(
      `Token-ul pentru ID-ul \`${id}\` a fost generat cu succes.\n\n**Token:** ${token}\n**Tip:** ${tip}\n**Expira la:** ${expiryDate}`,
      {
        pulsar: pulsar,
        interaction: interaction
      }
    );
  }
};
