import mongoose from 'npm:mongoose';

const perioadaSchema = new mongoose.Schema(
  {
    period: String,
    active: Boolean,
  },
  { collection: "perioade" }
);

const Perioada = new mongoose.model("Perioada", perioadaSchema);

export default Perioada;