import mongoose, { Model } from 'npm:mongoose';
import IEntryList from '../../interfaces/schemaInterfaces/entryList.interfaces.ts';

const entryListSchema = new mongoose.Schema<IEntryList>(
    {
        tip_: String,
        week: String,
        list: Array
    },
    { collection: 'clistentries' }
);

const EntryList: Model<IEntryList> = mongoose.model<IEntryList>('EntryList', entryListSchema);

export default EntryList;
