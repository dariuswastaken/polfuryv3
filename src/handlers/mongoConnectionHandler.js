import { Pulsar } from '../../pulsar/index.pulsar.js';
const MongoClient = Pulsar().MongoClient;

export const db = new MongoClient();
