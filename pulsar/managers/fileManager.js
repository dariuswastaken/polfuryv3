import * as fileExports from '../exports/files.js';

const fileManager = {
  createInstance: () => {
    return {
      createCacheManager: fileExports.createCacheManager,
      loadFilesFromDir: fileExports.loadFilesFromDir
    };
  }
};

export default fileManager;