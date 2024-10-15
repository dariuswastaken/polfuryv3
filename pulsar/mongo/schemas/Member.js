import mongoose from 'npm:mongoose';

const memberSchema = new mongoose.Schema(
  {
    nume: String,
    IDDiscord: String,
    callsign: String,
    IDServer: Number,
    grad: String,
    corp: String,
    dataIntrare: String,
    dataActualizare: String,
    certificate: {
      radio: Boolean,
      moto: Boolean,
      pilot: Boolean,
      highspeed: Boolean,
      mdt: Boolean,
    },
    functii: Array,
    sanctiuni: Array,
    avertismente: Number,
    notite: Array,
  },
  { collection: "members" }
);

const Member = new mongoose.model("Member", memberSchema);

export default Member;