const utils = require('../exports/utils');
const path = require('path');

module.exports = {
  utilsManager: {
    createInstance: () => {
      return {
        time: utils.time,
        uniques: utils.uniques
      };
    },
    createNew: (call, filePath) => {
      try {
        const resolvedPath = path.resolve(path.dirname(call), filePath);
        return require(resolvedPath);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
