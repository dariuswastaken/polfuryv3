import path from 'node:path';
import fs from 'node:fs';

export const exportModules = async (dir) => {
    const modules = {};

    const files = fs.readdirSync(dir);

    await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                Object.assign(modules, await exportModules(filePath));
            } else if (file.endsWith('.js')) {
                const moduleName = path.basename(file, path.extname(file));
                modules[moduleName] = await import(filePath);
            }
        })
    );

    return modules;
};
