import { exportModules } from '../core/baseExportFSModule.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoQueries = await exportModules(path.join(__dirname, './functions'));

const categories = [
  'baseActivityQueries',
  'userLeaveQueries',
  'callsignUpdateQueries',
  'acProfileQueries',
  'baseProfileQueries',
  'bulkQueries',
  'profileDocumentChecks',
  'profileUpdateQueries',
  'userSnapshotQueries',
  'sessionChecks',
  'sessionUpdateQueries',
  'componentQueries',
  'cooldownQueries',
  'entryListQueries',
  'logQueries',
  'sanctionDBQueries',
  'tokenQueries'
];

const queryExports = {};

for (const category of categories) {
  if (mongoQueries[category]) {
    Object.assign(queryExports, mongoQueries[category]);
  }
}

export default queryExports;
