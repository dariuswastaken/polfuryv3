import { PulsarClient } from './src/client.pulsar.js';

module.exports.Pulsar = function () {
  return new PulsarClient();
};
