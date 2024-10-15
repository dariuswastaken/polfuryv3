import * as fileExports from '../exports/files.js';

module.exports = {
  fileManager: {
    createInstance: () => {
      return {
        createCacheManager: fileExports.createCacheManager,
        loadFilesFromDir: fileExports.loadFilesFromDir
      };
    }
  }
};
