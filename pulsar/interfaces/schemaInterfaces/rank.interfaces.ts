import { Document } from 'npm:mongoose';

export interface IRank extends Document {
    rankName: string;
    callsignRange: string;
    rankRole: string;
    rankActivityRequirements: {
        minPontaj: number;
        minReports: number;
        minFines: number;
        minCalls: number;
        minActionActivity: number;
        pontaj: {
            gradeIncrease: number;
            minIncrease: number;
            gradeDecrease: number;
        };
        reports: {
            gradeIncrease: number;
            reportIncrease: number;
            gradeDecrease: number;
        };
        fines: {
            gradeIncrease: number;
            fineIncrease: number;
            gradeDecrease: number;
        };
        calls: {
            gradeIncrease: number;
            callIncrease: number;
            gradeDecrease: number;
        };
        actionActivity: {
            gradeIncrease: number;
            actionIncrease: number;
            gradeDecrease: number;
        };
    };
}