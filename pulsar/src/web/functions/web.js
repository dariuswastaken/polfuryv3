const WebClient = require('../client/webClient');
const webClient = new WebClient();
const fs = require('fs')

module.exports = {
  getUserMdtData: async (userId) => {
    const response = await webClient.get('https://panel.furyrp.ro/api/server/raportPolitie');
    return response.data.find(user => user[0].startsWith(`[${userId}]`));
  },
  isOnDuty: async (userId) => {
    const response = await webClient.get('https://panel.furyrp.ro/api/server/raportPolitie');
    const data = await response.data.find(user => user[0].startsWith(`[${userId}]`));
    if(data === undefined) return false;
    return data[9];
  },
  resetMDT: async () => {
    await webClient.post('https://panel.furyrp.ro/api/server/raportPolitie/reset', {
      reset: true
    });
  }
};
