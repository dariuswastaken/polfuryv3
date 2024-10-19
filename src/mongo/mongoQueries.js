import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default async function createMongoQueries(exportModules) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const mongoQueries = await exportModules(path.join(__dirname, './functions'));

  const categories = [
    'baseActivityQueries',
    'topActivityQueries',
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
      await Object.assign(queryExports, mongoQueries[category]);
    }
  }

  return queryExports;
}
