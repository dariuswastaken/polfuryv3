const nodeSchedule = require('node-schedule');
const mongo = require('../../../src/mongo/mongoQueries.js');
const recurrenceRules = require('../../../src/utils/functions/schedules/scheduleRecurrenceRules.js');

module.exports = {
  name: 'activitySchedule',
  async execute(Pulsar) {
    const updateActivityRetry = async () => {
      let updateCount = 2;
      while (updateCount > 0) {
        await updateActivity();
        updateCount--;
      }
    };
    const webManager = await Pulsar().webManager.createInstance();
    const updateActivity = async () => {
      try {
        const members = await mongo.getAllMembers();
        for (let member of members) {
          const mdtData = await webManager.getUserMdtData(member.IDServer);
          if (mdtData) {
            await mongo.updateActivity(member.IDDiscord, member.IDServer, {
              pontaj: parseInt(mdtData[6]),
              rapoarte: parseInt(mdtData[4]),
              amenzi: parseInt(mdtData[3]),
              apeluri: parseInt(mdtData[5]),
              lastLogin: mdtData[7]
            });
          }
        }
        console.log(
          '[SCHEDULER] Succesfully executed activity update schedule.'
        );
      } catch (error) {
        console.log(
          '[SCHEDULER] An error occured while trying to execute activity update schedule.'
        );
      }
    };
    Pulsar().client.on('ready', async () => {
      const rules = Object.values(recurrenceRules.activity);
      for(let i = 0; i < rules.length; i++) {
        nodeSchedule.scheduleJob(rules[i], updateActivityRetry);
      }
      console.log('[SCHEDULER] Activity update schedules have been deployed.');
    });
  }
};
