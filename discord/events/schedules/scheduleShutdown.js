import nodeSchedule from 'npm:node-schedule';

module.exports = {
  name: 'scheduleShutdown',
  async execute() {
    process.on('exit', async () => {
      nodeSchedule.gracefulShutdown();
      console.log('[SCHEDULER] Succesfully executed shutdown schedule.');
    });
  }
};
