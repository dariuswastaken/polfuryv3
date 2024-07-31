const mongoose = require("mongoose");

const cListSchema = new mongoose.Schema(
  {
    tip_: String,
    period: String,
    members: Array || null,
  },
  { collection: "clists" }
);

const CList = mongoose.model("CList", cListSchema);

module.exports = {
  schema: CList,
};
