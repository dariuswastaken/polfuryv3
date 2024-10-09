const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { validateHeaderValue } = require('http');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Analytical information about the bot'),
  enabled: true,
  async execute(pulsar, interaction, mongo, utils) {
    await interaction.deferReply({ ephemeral: true });

    let totalMemory = Math.round((os.totalmem() / 1024 / 1024) * 100) / 100;

    let cpu = os.cpus();
    let cpuData = `${cpu[0].model} @ ${cpu[0].speed}MHz`;

    let botLatency = Date.now() - interaction.createdTimestamp + 'ms';

    let processMemUsage = process.memoryUsage().heapUsed / 1024 / 1024;

    let totalMem = os.totalmem();
    let freeMem = os.freemem();
    let memUsage = totalMem - freeMem;
    let usedMemInMB = memUsage / (1024 * 1024);

    let freeMemInMB = freeMem / (1024 * 1024);

    await pulsar.discordManager.embeds.createDefaultEmbed('**INFO**', {
      interaction: interaction,
      ephemeral: true,
      deferReply: true,
      fields: [
        {
          name: 'Version',
          value: `${pulsar.client.config.version}`,
          inline: true
        },
        {
          name: 'Runtime',
          value: `node.js ${process.version}`,
          inline: true
        },
        {
          name: 'Latency',
          value: `${botLatency}`,
          inline: true
        },
        {
          name: 'Framework',
          value: 'Pulsar',
          inline: true
        },
        {
          name: 'Pulsar Version',
          value: `${pulsar.config.version}`,
          inline: true
        },
        {
          name: 'Discord.js Version',
          value: `14.16.3`,
          inline: true
        },
        {
          name: 'Database',
          value: 'MongoDB',
          inline: true,
        },
        {
          name: 'Database Wrapper',
          value: `Pulsar MongoDB Client Wrapper (using mongoose)`,
          inline: true
        },
        {
          name: 'OS',
          value: `${os.platform()}, Kernel version ${os.release()}`,
          inline: true
        },
        {
          name: 'CPU',
          value: `${cpuData}`,
          inline: true
        },
        {
          name: 'RAM (Total System Usage)',
          value: `${parseFloat(usedMemInMB).toFixed(0)}mb`,
          inline: true
        },
        {
          name: 'RAM (Bot Usage)',
          value: `${parseFloat(processMemUsage).toFixed(0)}mb`,
          inline: true
        },
        {
          name: 'RAM (Free)',
          value: `${parseFloat(freeMemInMB).toFixed(0)}mb`,
          inline: true
        },
        {
          name: 'RAM (Total)',
          value: `${parseFloat(totalMemory).toFixed(0)}mb`,
          inline: true
        },
        {
          name: 'Uptime',
          value: `${await pulsar.utilsManager.time.formatUptime(process.uptime())}`,
          inline: true
        },
      ],
    });
  }
};