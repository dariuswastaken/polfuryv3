import webFunctions from '../exports/web';

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
