import fs from 'fs';
import path from 'path';

const schemas = path.join(__dirname, '../mongo/schemas');

let schemaObj = {};

fs.readdirSync(schemas).forEach((file) => {
  try {
    const { schema } = require(path.join(schemas, file));
    const fileName = path.basename(file, path.extname(file));
    schemaObj[fileName] = schema;
  } catch (err) {
    console.error(
      `[SCHEMA IMPORT ERROR] Error importing schema from file, error: ${err}`
    );
  }
});

module.exports = {
  schemas: schemaObj
};
