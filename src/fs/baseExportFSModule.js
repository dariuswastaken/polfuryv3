import fs from 'node:fs';
import path from 'node:path';

export const exportModules = async (dir) => {
  const modules = {};

  const files = fs.readdirSync(dir);

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const subModules = await exportModules(filePath);
        Object.assign(modules, subModules);
      } else if (file.endsWith('.js')) {
        const moduleName = path.basename(file, path.extname(file));
        try {
          modules[moduleName] = await import(filePath);
        } catch (e) {
          console.error(
            `[FILESYSTEM] Error importing module ${moduleName} from ${filePath}`
          );
          console.error(e);
        }
      }
    })
  );

  return modules;
};
