import mongoose, { Model } from 'npm:mongoose';
import { IRank } from '../../interfaces/schemaInterfaces/rank.interfaces.ts';

const rankSchema = new mongoose.Schema<IRank>(
    {
        rankName: String,
        callsignRange: String,
        rankRole: String,
        rankActivityRequirements: {
            minPontaj: Number,
            minReports: Number,
            minFines: Number,
            minCalls: Number,
            minActionActivity: Number,
            pontaj: {
                gradeIncrease: Number,
                minIncrease: Number,
                gradeDecrease: Number
            },
            reports: {
                gradeIncrease: Number,
                reportIncrease: Number,
                gradeDecrease: Number
            },
            fines: {
                gradeIncrease: Number,
                fineIncrease: Number,
                gradeDecrease: Number
            },
            calls: {
                gradeIncrease: Number,
                callIncrease: Number,
                gradeDecrease: Number
            },
            actionActivity: {
                gradeIncrease: Number,
                actionIncrease: Number,
                gradeDecrease: Number
            }
        }
    },
    { collection: 'ranks' }
);

const Rank: Model<IRank> = new mongoose.model<IRank>('Rank', rankSchema);

export default Rank;
