const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema(
  {
    feature: String,
    date: String,
  },
  { collection: 'updates' }
);

const Update = new mongoose.model('Update', updateSchema);

module.exports = {
  schema: Update
};
