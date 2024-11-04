import { readdirSync } from 'node:fs';
import path from 'node:path';

export function loadFilesFromDir(dir: string, callback: (filePath: string) => void): void {
    const files: string[] = [];

    const folders = readdirSync(dir);

    folders.forEach((folder: string) => {
        const folderPath = path.join(dir, folder);
        const filesInFolder = readdirSync(folderPath);

        filesInFolder.forEach((file: string) => {
            const filePath = path.join(folderPath, file);
            files.push(filePath);
        });
    });

    files.forEach(callback);
}
