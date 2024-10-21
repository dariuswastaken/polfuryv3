import mongoose from 'npm:mongoose';

const eivdentaHighspeedSchema = new mongoose.Schema(
    {
        tip_: String,
        uniqueID: String,
        userID: String,
        active: Boolean,
        data: {
            nume: String,
            tip: String,
            IDDiscord: String,
            numarInmatriculare: String,
            dataClockIn: Date,
            dataClockOut: Date || null
        }
    },
    { collection: 'evidenteHighspeed' }
);

const EvidentaHighspeed = new mongoose.model('EvidentaHighspeed', eivdentaHighspeedSchema);

export default EvidentaHighspeed;
