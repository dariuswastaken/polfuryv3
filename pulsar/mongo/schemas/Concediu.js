import mongoose from 'npm:mongoose';

const concediuSchema = new mongoose.Schema(
  {
    IDDiscord: String,
    perioada: String,
    reason: String,
    days: Array,
  },
  { collection: "concediu" }
);

const Concediu = new mongoose.model("Concediu", concediuSchema);

export default Concediu;
