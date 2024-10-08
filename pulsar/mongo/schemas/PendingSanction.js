const mongoose = require('mongoose');

const pendingSanctionSchema = new mongoose.Schema(
  {
    sanctionID: String,
    sanctionedID: String,
    authorID: String,
    pending: Boolean,
    sanctions: Array || null,
    reason: String || null,
    active: Boolean,
    date: Date,
    scheduled: Array || null,
  },
  { collection: 'pendingSanctions' }
);

const PendingSanction = new mongoose.model(
  'PendingSanction',
  pendingSanctionSchema
);

module.exports = {
  schema: PendingSanction
};
