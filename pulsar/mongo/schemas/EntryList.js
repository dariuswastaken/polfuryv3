import mongoose from 'npm:mongoose';

const entryListSchema = new mongoose.Schema(
    {
        tip_: String,
        week: String,
        list: Array
    },
    { collection: 'clistentries' }
);

const EntryList = mongoose.model('EntryList', entryListSchema);

export default EntryList;
