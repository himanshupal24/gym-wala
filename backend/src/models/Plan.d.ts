import mongoose, { Document } from 'mongoose';
export interface IPlan extends Document {
    name: string;
    description: string;
    price: number;
    durationInMonths: number;
    memberLimit: number;
    branchLimit: number;
    features: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Plan: mongoose.Model<IPlan, {}, {}, {}, mongoose.Document<unknown, {}, IPlan, {}, {}> & IPlan & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Plan.d.ts.map