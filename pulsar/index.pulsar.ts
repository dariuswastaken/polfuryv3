import PulsarClient from './src/client.pulsar.ts';

export const Pulsar = function (): PulsarClient {
    return new PulsarClient();
};
