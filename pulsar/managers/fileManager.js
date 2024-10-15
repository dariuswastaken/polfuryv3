import fileExports from '../exports/files';

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
