import mongoose from 'npm:mongoose';

const activitateSchema = new mongoose.Schema(
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
  },
  { collection: "activitate-new" }
);

const ActivitateBeta = new mongoose.model("Activitate", activitateSchema);

module.exports = {
  schema: ActivitateBeta,
};
