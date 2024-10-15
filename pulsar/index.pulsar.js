import { PulsarClient } from './src/client.pulsar';

module.exports.Pulsar = function () {
  return new PulsarClient();
};
