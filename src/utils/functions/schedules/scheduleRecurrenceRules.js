const nodeSchedule = require('node-schedule');

module.exports = {
  activity: {
    rule6AM: new nodeSchedule.RecurrenceRule(),
    rule9AM: new nodeSchedule.RecurrenceRule(),
    rule12PM: new nodeSchedule.RecurrenceRule(),
    rule3PM: new nodeSchedule.RecurrenceRule(),
    rule6PM: new nodeSchedule.RecurrenceRule(),
    rule8PM: new nodeSchedule.RecurrenceRule(),
    rule10PM: new nodeSchedule.RecurrenceRule(),
  }
};

module.exports.activity.rule6AM.hour = 6;
module.exports.activity.rule6AM.minute = 0;
module.exports.activity.rule9AM.hour = 9;
module.exports.activity.rule9AM.minute = 0;
module.exports.activity.rule12PM.hour = 12;
module.exports.activity.rule12PM.minute = 0;
module.exports.activity.rule3PM.hour = 15;
module.exports.activity.rule3PM.minute = 0;
module.exports.activity.rule6PM.hour = 18;
module.exports.activity.rule6PM.minute = 0;
module.exports.activity.rule8PM.hour = 20;
module.exports.activity.rule8PM.minute = 0;
module.exports.activity.rule10PM.hour = 22;
module.exports.activity.rule10PM.minute = 0;
module.exports.activity.rule6AM.tz = 'Europe/Bucharest';
module.exports.activity.rule9AM.tz = 'Europe/Bucharest';
module.exports.activity.rule12PM.tz = 'Europe/Bucharest';
module.exports.activity.rule3PM.tz = 'Europe/Bucharest';
module.exports.activity.rule6PM.tz = 'Europe/Bucharest';
module.exports.activity.rule8PM.tz = 'Europe/Bucharest';
module.exports.activity.rule10PM.tz = 'Europe/Bucharest';
