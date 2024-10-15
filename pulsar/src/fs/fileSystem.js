import { readdirSync } from 'node:fs';
import path from 'node:path';

export async function loadFilesFromDir(dir, callback) {
  const files = [];

  try {
    const items = await readdir(dir);

    await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(dir, item);
        const itemStat = await stat(itemPath);

        if (itemStat.isDirectory()) {
          await loadFilesFromDir(itemPath, callback);
        } else if (item.endsWith('.js')) {
          files.push(itemPath);
          callback(itemPath);
        }
      })
    );
  } catch (error) {
    console.error(`[ERROR] Failed to read directory ${dir}:`, error);
  }

  return files;
}
