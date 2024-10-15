import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemas = path.join(__dirname, '../mongo/schemas');

let schemaObj = {};

fs.readdirSync(schemas).forEach((file) => {
  try {
    const { schema } = import(path.join(schemas, file));
    const fileName = path.basename(file, path.extname(file));
    schemaObj[fileName] = schema;
  } catch (err) {
    console.error(
      `[SCHEMA IMPORT ERROR] Error importing schema from file, error: ${err}`
    );
  }
});

export default schemaObj;