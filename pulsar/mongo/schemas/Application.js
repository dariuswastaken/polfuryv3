import mongoose from 'npm:mongoose';

const applicationSchema = new mongoose.Schema(
    {
        tip_: String,
        IDDiscord: String,
        uniqueID: String,
        callsign: String,
        nume: String,
        data: Date,
        messageID: String,
        status: String
    },
    { collection: 'aplicatii' }
);

const Application = new mongoose.model('Application', applicationSchema);

export default Application;
