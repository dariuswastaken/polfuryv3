module.exports = {
  createLog: async ({ pulsar, interaction, mongo, fields, channel, type }, logData) => {
    await mongo.createLog(logData.tip_, logData.id, logData.data);

    await pulsar.discordManager.embeds.createLogEmbed({
      guild: interaction.guild,
      channel: channel,
      fields: fields,
      title: `LOG ${type}`
    });
  },
  
  createSimpleLog: async (mongo, logData) => {
    await mongo.createLog(logData.type, logData.id, logData.data);
  }
};
