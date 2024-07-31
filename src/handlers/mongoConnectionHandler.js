const { Pulsar } = require('../../pulsar/index.pulsar.js');
const MongoClient = Pulsar().MongoClient;

module.exports.db = new MongoClient();
