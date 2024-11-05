import * as singleQueries from '../mongo/functions/singleQueries.ts';
import * as bulkQueries from '../mongo/functions/bulkQueries.ts';
import { MongoClient } from '../../interfaces/mongo/mongoClient.interfaces.ts';
import { init } from '../../mongo/connection.ts';

export function mongoClient(): MongoClient {
    init();
    return {
        find: singleQueries.find,
        findMore: bulkQueries.findMore,
        create: singleQueries.create,
        update: singleQueries.update,
        push: singleQueries.push,
        set: singleQueries.set,
        add: singleQueries.add,
        delete: singleQueries.deleteDocument,
        getAll: bulkQueries.getAll,
        getAllWSort: bulkQueries.getAllWSort,
        getAllWProjection: bulkQueries.getAllWProjection,
        updateBulk: bulkQueries.updateBulk,
        deleteBulk: bulkQueries.deleteBulk,
        deleteAll: bulkQueries.deleteAll,
        findWProjection: singleQueries.findWProjection,
        findWSort: singleQueries.findWSort,
        findMoreWSort: bulkQueries.findMoreWSort
    };
}
