import processFunctions from '../exports/process.js';

module.exports = {
  processManager: {
    createInstance: () => {
      return {
        createErrorHandler: processFunctions.createErrorHandler
      };
    }
  }
};
