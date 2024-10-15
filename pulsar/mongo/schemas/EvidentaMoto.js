import mongoose from 'npm:mongoose';

const eivdentaMotoSchema = new mongoose.Schema(
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
  { collection: "evidenteMoto" }
);

const EvidentaMoto = new mongoose.model("EvidentaMoto", eivdentaMotoSchema);

module.exports = {
  schema: EvidentaMoto,
};
