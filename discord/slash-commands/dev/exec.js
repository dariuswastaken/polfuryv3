const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('exec')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDescription('Dev CMD'),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    if (interaction.user.id !== '1027526587031232552') return;

    const members = await mongo.getAllMembers();

    for(let member of members) {
      try {
        const user = await interaction.guild.members.fetch(member.IDDiscord);
        if(user.roles.cache.has('1094603206203547758')) {
          await mongo.addFunc(member.IDDiscord, 'Instr. Moto')
        }
        if(user.roles.cache.has('1094603228668248094')) {
          await mongo.addFunc(member.IDDiscord, 'Instr. Pilot')
        }
        if(user.roles.cache.has('1102705257802387518')) {
          await mongo.addFunc(member.IDDiscord, 'Instr. HS')
        }
        if(user.roles.cache.has('1094603229456769155')) {
          await mongo.addFunc(member.IDDiscord, 'Instr. Radio')
        }
        if(user.roles.cache.has('1147540100327157780')) {
          await mongo.addFunc(member.IDDiscord, 'Instr. MDT')
        }
        if(user.roles.cache.has('1094603202734854225')) {
          await mongo.addFunc(member.IDDiscord, 'Tester')
        }
      } catch(error) {
        console.log(`${member.nume} not found anymore`)
      }
    }

  }
};
