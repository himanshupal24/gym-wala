import mongoose, { Document } from 'mongoose';
export interface IMembershipPlan extends Document {
    name: string;
    description: string;
    price: number;
    durationInMonths: number;
    gym: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const MembershipPlan: mongoose.Model<IMembershipPlan, {}, {}, {}, mongoose.Document<unknown, {}, IMembershipPlan, {}, {}> & IMembershipPlan & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=MembershipPlan.d.ts.map