import mongoose from 'npm:mongoose';

const occupiedNumSchema = new mongoose.Schema({
  tip_: String,
  ID: Number,
  active: Boolean,
});

const OccupiedNum = new mongoose.model("OccupiedNum", occupiedNumSchema);

module.exports = {
  schema: OccupiedNum,
};
