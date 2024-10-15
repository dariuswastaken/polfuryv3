import mongoose from 'npm:mongoose';

const callsignSchema = new mongoose.Schema(
  {
    tip_: String,
    id: String,
    taken: Boolean,
  },
  { collection: "callsigns" }
);

const Callsign = new mongoose.model("Callsign", callsignSchema);

export default Callsign;