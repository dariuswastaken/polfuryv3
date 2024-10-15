import * as webFunctions from '../exports/web.js';

module.exports = {
  webManager: {
    createInstance: () => {
      return {
        getUserMdtData: webFunctions.getUserMdtData,
        isOnDuty: webFunctions.isOnDuty,
      };
    }
  }
};
