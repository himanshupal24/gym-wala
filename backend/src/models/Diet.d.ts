import mongoose, { Document } from 'mongoose';
export interface IDiet extends Document {
    title: string;
    member: mongoose.Types.ObjectId;
    trainer: mongoose.Types.ObjectId;
    gym: mongoose.Types.ObjectId;
    meals: {
        time: string;
        description: string;
        calories?: number;
    }[];
    notes?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Diet: mongoose.Model<IDiet, {}, {}, {}, mongoose.Document<unknown, {}, IDiet, {}, {}> & IDiet & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Diet.d.ts.map