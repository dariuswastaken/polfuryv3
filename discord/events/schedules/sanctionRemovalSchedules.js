const nodeSchedule = require('node-schedule');
const mongo = require('../../../src/mongo/mongoQueries.js');

module.exports = {
  name: 'sanctionRemovalSchedules',
  async execute(Pulsar) {
    const sanctions = mongo.getAllSanctions();

    for (let sanction of sanctions) {
      if (sanction.pending === false) {
        continue;
      }
      
      for (let entry of sanction.scheduled) {
        const sanctionExpiry = new Date(entry.expiryDate);
        const currentDate = new Date();
        if (sanctionExpiry.getTime() < currentDate.getTime()) {
          continue; 
        }
        
        const expiryDate = new Date(entry.expiryDate);
        console.log(`Scheduling removal of ${sanction.sanctionedID} for ${expiryDate} (sanction: ${entry.sanction})`);
        await nodeSchedule.scheduleJob(expiryDate, async () => {
          if(entry.sanction === 'av') {
            await mongo.removeAvM(sanction.sanctionedID)
          }
        });
      }
    }
  }
};
