import init from './src/core/init.js';

import dotenv from 'npm:dotenv';
dotenv.config();

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, './src/utils/exports/base-utils-exports'))

init.trigger();