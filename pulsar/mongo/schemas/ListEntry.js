const mongoose = require("mongoose");

const entryListSchema = new mongoose.Schema(
  {
    tip_: String,
    period: String,
    IDDiscord: String,
    data: Object,
  },
  { collection: "clistentries" }
);

const EntryList = mongoose.model("EntryList", entryListSchema);

module.exports = {
  schema: EntryList,
};
