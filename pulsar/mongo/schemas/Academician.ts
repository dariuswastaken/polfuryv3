import mongoose, { Model } from 'npm:mongoose';
import { IAcademician } from '../../interfaces/schemaInterfaces/academician.interfaces.ts';

const academicianSchema = new mongoose.Schema<IAcademician>(
    {
        nume: String,
        IDDiscord: String,
        IDServer: Number,
        dataIntrare: Date,
        dataActualizare: Date,
        esuariTest: Number,
        cooldown: Date || null,
        prezentaAcademie: Boolean,
        suspendat: Boolean
    },
    { collection: 'academicieni' }
);

const Academician: Model<IAcademician> = new mongoose.model<IAcademician>(
    'Academician',
    academicianSchema
);

export default Academician;
