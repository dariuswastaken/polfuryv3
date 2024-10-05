const fs = require('fs');
const path = require('path');

const exportModules = (dir) => {
  const modules = {};

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      Object.assign(modules, exportModules(filePath));
    } else if (file.endsWith('.js')) {
      const moduleName = path.basename(file, path.extname(file));
      modules[moduleName] = require(filePath);
    }
  });

  return modules;
};

module.exports = {
  exportModules
};
