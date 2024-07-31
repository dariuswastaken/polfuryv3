const mongoose = require("mongoose");

const academicianSchema = new mongoose.Schema(
  {
    nume: String,
    IDDiscord: String,
    IDServer: Number,
    dataIntrare: Date,
    dataActualizare: Date,
    esuariTest: Number,
    cooldown: Date || null,
    prezentaAcademie: Boolean,
    suspendat: Boolean,
  },
  { collection: "academicieni" }
);

const Academician = new mongoose.model("Academician", academicianSchema);

module.exports = {
  schema: Academician,
};
