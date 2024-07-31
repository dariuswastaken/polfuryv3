const { glob } = require('glob');

module.exports = {
  async getModule(moduleName) {
    const module = require(`${moduleName}`);

    return module;
  },

  async getFile(filePath) {
    return new Promise((resolve, reject) => {
      glob(`**/${filePath}`, (err, files) => {
        if (err) {
          reject(err);
        } else if (files.length === 0) {
          reject(new Error(`File not found: ${filePath}`));
        } else {
          const file = require(`${files[0]}`);
          resolve(file);
        }
      });
    });
  }
};
