import pulsarInstance from '../core/pulsarInstance';
const mongoClient = pulsarInstance.mongoClient;

export const db = new mongoClient();
