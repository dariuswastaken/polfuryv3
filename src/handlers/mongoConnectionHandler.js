import { Pulsar } from '../../pulsar/index.pulsar.ts';
const MongoClient = Pulsar().MongoClient;

export const db = new MongoClient();
