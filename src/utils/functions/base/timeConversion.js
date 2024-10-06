const moment = require('moment-timezone');

module.exports = {
  calculateMinutes: async (startTime, endTime) => {
    const start = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');
    const duration = moment.duration(end.diff(start));
    return duration.asMinutes();
  },
  getCurrentHour: async () => {
    const date = moment.tz('Europe/Bucharest');
    const hour = date.format('HH:mm');
    return hour.split(':')[0];
  },
  createTimes: async (time_1, time_2) => {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setHours(time_1.split(':')[0] - 2);
    startDate.setMinutes(time_1.split(':')[1]);

    endDate.setHours(time_2.split(':')[0] - 2);
    endDate.setMinutes(time_2.split(':')[1]);

    return {
      times: {
        startDate,
        endDate
      },
      timestamps: {
        startDate: startDate.getTime(),
        endDate: endDate.getTime()
      }
    };
  },
  validateTimeFormat: async (time, format) => {
    let timeFormat;
    switch (format) {
      case 'HH:mm':
        timeFormat = /^\d{1,2}:\d{1,2}$/;
        break;
      case 'HH:mm:ss':
        timeFormat = /^\d{1,2}:\d{1,2}:\d{1,2}$/;
        break;
      default:
        timeFormat = /^\d{1,2}:\d{1,2}$/;
        break;
    }
    return timeFormat.test(time);
  },
  getCurrentTime: async () => {
    const date = moment.tz('Europe/Bucharest');
    const time = date.format('HH:mm:ss');
    return time;
  }
};
