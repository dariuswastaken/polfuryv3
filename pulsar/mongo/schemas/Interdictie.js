const mongoose = require("mongoose");

const interdictieSchema = new mongoose.Schema({
  tip_: String,
  IDDiscord: String,
  permanent: Boolean || null,
  dataExpirare: Date || null,
  active: Boolean,
});

const Interdictie = new mongoose.model("Interdictie", interdictieSchema);

module.exports = {
  schema: Interdictie,
};
