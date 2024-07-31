const processFunctions = require('../exports/process');

module.exports = {
  processManager: {
    createInstance: () => {
      return {
        createErrorHandler: processFunctions.createErrorHandler
      };
    }
  }
};
