import { loadBaseUtilModules } from '../loadBaseUtilModules';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = await loadBaseUtilModules(
  path.join(__dirname, '../../functions/discord/embeds')
);

const embedExports = modules;

export { embedExports };