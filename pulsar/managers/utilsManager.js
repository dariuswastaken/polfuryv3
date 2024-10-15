import path from 'node:path';
import * as utils from '../exports/utils.js';

const utilsManager = {
  createInstance: () => {
    return {
      time: utils.time,
      uniques: utils.uniques
    };
  },
  createNew: async (call, filePath) => {
    try {
      const resolvedPath = await path.resolve(path.dirname(call), filePath);
      return await import(resolvedPath).default;
    } catch (e) {
      console.error(e);
    }
  }
};

export default utilsManager;
