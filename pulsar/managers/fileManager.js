import * as fileExports from '../exports/files.js';

const fileManager = {
  createInstance: () => {
    return {
      createLogsManager: fileExports.createLogsManager,
      loadFilesFromDir: fileExports.loadFilesFromDir
    };
  }
};

export default fileManager;