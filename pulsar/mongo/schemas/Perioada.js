const mongoose = require("mongoose");

const perioadaSchema = new mongoose.Schema(
  {
    period: String,
    active: Boolean,
  },
  { collection: "perioade" }
);

const Perioada = new mongoose.model("Perioada", perioadaSchema);

module.exports = {
  schema: Perioada,
};
