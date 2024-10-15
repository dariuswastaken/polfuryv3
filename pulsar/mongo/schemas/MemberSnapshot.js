import mongoose from 'npm:mongoose';

const memberSnapshotSchema = new mongoose.Schema(
  {
    userData: {
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
        mdt: Boolean
      },
      functii: Array,
      sanctiuni: Array,
      avertismente: Number,
      notite: Array
    },
    IDDiscord: String,
    snapshotID: String,
    snapshotDate: Date
  },
  { collection: 'member-snapshots' }
);

const MemberSnapshot = new mongoose.model(
  'MemberSnapshot',
  memberSnapshotSchema
);

export default MemberSnapshot;