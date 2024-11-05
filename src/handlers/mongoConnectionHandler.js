import { Pulsar } from '../../pulsar/index.pulsar.ts';
const mongoClient = Pulsar().mongoClient;

export const db = new mongoClient();
