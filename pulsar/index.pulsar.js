import PulsarClient from './src/client.pulsar.js';

export const Pulsar = function () {
    return new PulsarClient();
};
