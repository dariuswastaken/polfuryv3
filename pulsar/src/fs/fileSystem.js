import { readdir } from 'node:fs';
import path from 'node:path';

export async function loadFilesFromDir(dir, callback) {
  const files = [];

  const dirs = await readdir(dir);

  await Promise.all(
    dirs.map(async (directory) => {
      const dirPath = path.join(dir, directory);
      const filesInDir = readdir(dirPath);
      
      filesInDir.forEach((file) => {
        const filePath = path.join(dirPath, file);
        files.push(filePath);
      });
    })
  );

  files.forEach(callback);
}