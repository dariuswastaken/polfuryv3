import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default async function createBotconfig(exportModules) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const botconfig = await exportModules(__dirname);

  return botconfig;
}