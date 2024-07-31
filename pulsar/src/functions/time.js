const moment = require('moment');

module.exports = {
  async formatUptime(uptime) {
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const minutes = Math.floor((uptime / 60) % 60);
    const seconds = Math.floor(uptime % 60);

    return `${days} zile, ${hours} ore, ${minutes} minute si ${seconds} secunde`;
  },

  async formatTime(time, timezone) {
    return moment(time).utcOffset(timezone).format('DD/MM/YYYY HH:mm:ss');
  },

  async formatTimestamp(time, timezone) {
    const date = new Date(time);
    const formattedDate = await date.toLocaleDateString('ro-RO', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return formattedDate;
  },

  async formatDefTime(time, timezone) {
    const date = new Date(time);
    const formattedDate = await date.toLocaleDateString('ro-RO', {
      timeZone: timezone
    });

    return formattedDate;
  }
};
