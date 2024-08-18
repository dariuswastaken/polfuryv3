const moment = require('moment');

module.exports = {
  async getDayAsString() {
    const date = new Date().toLocaleDateString('en-EN', {
      timeZone: 'Europe/Bucharest',
      weekday: 'long'
    });
    return date;
  },
  async getCurrentDate() {
    const date = moment.tz('Europe/Bucharest');
    const dateFormatted = date.format('YYYY-MM-DD');
    const [year, month, day] = dateFormatted.split('-');
    return `${day}.${month}.${year}`;
  },
  async getCurrentWeek() {
    let today = new Date();
    let day = today.getDay();

    let mondayDiff = day - 1;
    if (day === 0) mondayDiff = 6;

    let monday = new Date(today);
    monday.setDate(today.getDate() - mondayDiff);

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      weekDates.push(nextDay.toLocaleDateString('ro-RO').replace(/\//g, '.'));
    }

    return weekDates;
  },
  async isDateInWeek(date, weekStart, weekEnd) {
    date = new Date(date);
    weekStart = new Date(weekStart);
    weekEnd = new Date(weekEnd);

    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);

    return date >= weekStart && date <= weekEnd;
  },
  async getCurrentMonthAsString() {
    const months = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie'
    ]
    const currentMonth = new Date().getMonth();
    return months[currentMonth];
  },
  async getDifferenceInDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
};
