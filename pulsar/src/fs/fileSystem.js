import { readdirSync } from 'node:fs';
import path from 'node:path';

export async function loadFilesFromDir(dir, callback) {
  const files = [];

  const dirs = readdirSync(dir);

  await Promise.all(
    dirs.map(async (directory) => {
      const dirPath = path.join(dir, folder);
      const filesInDir = readdirSync(dirPath);
      
      filesInDir.forEach((file) => {
        const filePath = path.join(dirPath, file);
        files.push(filePath);
      });
    })
  );

  files.forEach(callback);
}