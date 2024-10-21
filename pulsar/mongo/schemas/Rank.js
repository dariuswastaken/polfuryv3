import mongoose from 'npm:mongoose';

const rankSchema = new mongoose.Schema(
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

const Rank = new mongoose.model('Rank', rankSchema);

export default Rank;
