const mongoose = require("mongoose");

const eivdentaPilotSchema = new mongoose.Schema(
  {
    tip_: String,
    uniqueID: String,
    userID: String,
    active: Boolean,
    data: {
      nume: String,
      tip: String,
      IDDiscord: String,
      numarInmatriculare: String,
      dataClockIn: Date,
      dataClockOut: Date || null,
    },
  },
  { collection: "evidentePilot" }
);

const EvidentaPilot = new mongoose.model("EvidentaPilot", eivdentaPilotSchema);

module.exports = {
  schema: EvidentaPilot,
};
