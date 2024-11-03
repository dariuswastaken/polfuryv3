import PulsarClient from './src/client.pulsar.js';

export const Pulsar = function (): PulsarClient {
    return new PulsarClient();
};
