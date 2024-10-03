const mongoose = require("mongoose");

const activitateSnapshotSchema = new mongoose.Schema(
  {
    IDDiscord: String,
    IDServer: Number,
    lastUpdate: Date,
    perioada: String,
    data: {
      pontaj: Number,
      rapoarte: Number,
      amenzi: Number,
      apeluri: Number,
      lastLogin: String,
    },
    snapshotID: String
  },
  { collection: "activitate-snapshot" }
);

const ActivitateSnapshot = new mongoose.model("ActivitateSnapshot", activitateSnapshotSchema);

module.exports = {
  schema: ActivitateSnapshot,
};
