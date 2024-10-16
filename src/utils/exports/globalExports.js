import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as exportFiles from './exportFiles.js';
import { flattenModules } from '../obj/flattenObj.js';

export default async function createGlobalUtilExports(exportModules) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const baseUtilModules = await exportModules(
    path.join(__dirname, '../functions')
  );

  const errors = await exportModules(
    path.join(__dirname, '../functions/discord/errors')
  );

  const moduleMap = {
    timeConversion: {},
    dayConversion: {},
    math: {},
    checks: {},
    buttonMenus: {},
    embeds: {},
    errors: {},
    validate: {},
    logging: {},
    modals: {},
    quickFunctions: {},
    roles: {},
    selectMenus: {},
    algos: {},
    activity: {}
  };

  for (const [file, entries] of Object.entries(exportFiles)) {
    if (moduleMap[file]) {
      for (const entry of entries) {
        if (baseUtilModules[entry]) {
          moduleMap[file][entry] = baseUtilModules[entry];
        }
      }
    }
  }

  for (const errorFunctionName in errors) {
    if (errors[errorFunctionName]) {
      moduleMap.errors[errorFunctionName] = errors[errorFunctionName];
    }
  }

  const globalExports = {
    timeConversion: flattenModules(moduleMap.timeConversion),
    dayConversion: flattenModules(moduleMap.dayConversion),
    math: flattenModules(moduleMap.math),
    checks: flattenModules(moduleMap.checks),
    discord: {
      buttonMenus: flattenModules(moduleMap.buttonMenus),
      embeds: flattenModules(moduleMap.embeds),
      errors: flattenModules(moduleMap.errors),
      validate: flattenModules(moduleMap.validate),
      logging: flattenModules(moduleMap.logging),
      modals: flattenModules(moduleMap.modals),
      quickFunctions: flattenModules(moduleMap.quickFunctions),
      roles: flattenModules(moduleMap.roles),
      selectMenus: flattenModules(moduleMap.selectMenus)
    },
    algorithms: flattenModules(moduleMap.algos),
    activity: {
      utils: flattenModules(moduleMap.activity)
    }
  };
  
  return globalExports;
}
