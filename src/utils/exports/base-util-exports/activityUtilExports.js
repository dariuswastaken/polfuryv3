import { loadBaseUtilModules } from '../loadBaseUtilModules.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await loadBaseUtilModules(path.join(__dirname, '../../functions/activity'));

const utils = modules.utils;

export { utils };