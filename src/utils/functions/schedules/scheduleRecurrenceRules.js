import nodeSchedule from 'npm:node-schedule';

const activity = {
  rule6AM: new nodeSchedule.RecurrenceRule(),
  rule9AM: new nodeSchedule.RecurrenceRule(),
  rule12PM: new nodeSchedule.RecurrenceRule(),
  rule3PM: new nodeSchedule.RecurrenceRule(),
  rule6PM: new nodeSchedule.RecurrenceRule(),
  rule8PM: new nodeSchedule.RecurrenceRule(),
  rule10PM: new nodeSchedule.RecurrenceRule()
};

activity.rule6AM.hour = 6;
activity.rule6AM.minute = 0;
activity.rule9AM.hour = 9;
activity.rule9AM.minute = 0;
activity.rule12PM.hour = 12;
activity.rule12PM.minute = 0;
activity.rule3PM.hour = 15;
activity.rule3PM.minute = 0;
activity.rule6PM.hour = 18;
activity.rule6PM.minute = 0;
activity.rule8PM.hour = 20;
activity.rule8PM.minute = 0;
activity.rule10PM.hour = 22;
activity.rule10PM.minute = 0;
activity.rule6AM.tz = 'Europe/Bucharest';
activity.rule9AM.tz = 'Europe/Bucharest';
activity.rule12PM.tz = 'Europe/Bucharest';
activity.rule3PM.tz = 'Europe/Bucharest';
activity.rule6PM.tz = 'Europe/Bucharest';
activity.rule8PM.tz = 'Europe/Bucharest';
activity.rule10PM.tz = 'Europe/Bucharest';

export { activity };
