import { glob } from 'npm:glob';

export const getModule = function (moduleName) {
  const module = require(`${moduleName}`);

  return module;
};

export const getFile = async (filePath) => {
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
};
