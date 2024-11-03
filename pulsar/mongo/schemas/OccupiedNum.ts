import mongoose, { Model } from 'npm:mongoose';
import { IOccupiedNum } from '../../interfaces/schemaInterfaces/occupiedNum.interfaces.ts';

const occupiedNumSchema = new mongoose.Schema<IOccupiedNum>(
    {
        tip_: String,
        ID: Number,
        active: Boolean
    },
    { collection: 'occupiednums' }
);

const OccupiedNum: Model<IOccupiedNum> = new mongoose.model<IOccupiedNum>(
    'OccupiedNum',
    occupiedNumSchema
);

export default OccupiedNum;
