import path from 'node:path';
import * as utils from '../exports/utils.js';

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
        return import(resolvedPath).then((module) => module.default);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
