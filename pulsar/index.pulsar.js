const { PulsarClient } = require('./src/client.pulsar');

module.exports.Pulsar = function () {
  return new PulsarClient();
};
