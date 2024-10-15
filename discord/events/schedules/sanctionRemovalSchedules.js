import nodeSchedule from 'npm:node-schedule';
import mongo from '../../../src/mongo/mongoQueries.js';

export default {
  name: 'sanctionRemovalSchedules',
  async execute(Pulsar) {
    const sanctions = await mongo.getAllSanctions();
    
    for (let sanction of sanctions) {
      if (sanction.pending === true) {
        continue;
      }
      
      for (let entry of sanction.scheduled) {
        const sanctionExpiry = new Date(entry.expiryDate);
        const currentDate = new Date();
        if (sanctionExpiry.getTime() < currentDate.getTime()) {
          continue; 
        }
        
        const expiryDate = new Date(entry.expiryDate);
        await nodeSchedule.scheduleJob(expiryDate, async () => {
          if(entry.sanction === 'av') {
            await mongo.removeAvM(sanction.sanctionedID)
          }
        });
      }
    }
    
    console.log('[SCHEDULER] Sanction removal schedules have been set.');
  }
};
