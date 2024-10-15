import { readdirSync } from 'node:fs';
import path from 'node:path';

function loadFilesFromDir(dir, callback) {
  const files = [];

  readdirSync(dir).forEach(async (folder) => {
    readdirSync(path.join(dir, folder)).forEach(async (file) => {
      files.push(path.join(dir, folder, file));
    });
  });

  files.forEach(callback);
}

module.exports = {
  loadFilesFromDir
};
