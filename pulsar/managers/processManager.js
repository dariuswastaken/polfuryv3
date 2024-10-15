import processFunctions from '../exports/process';

module.exports = {
  processManager: {
    createInstance: () => {
      return {
        createErrorHandler: processFunctions.createErrorHandler
      };
    }
  }
};
