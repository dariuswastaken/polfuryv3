import pulsarInstance from '../core/pulsarInstance.js';
const mongoClient = pulsarInstance.mongoClient;

export const db = new mongoClient();
