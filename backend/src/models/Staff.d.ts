import mongoose, { Document } from 'mongoose';
export interface IStaff extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: 'Trainer' | 'Receptionist' | 'Manager';
    gym: mongoose.Types.ObjectId;
    status: 'Active' | 'Inactive';
    schedule?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Staff: mongoose.Model<IStaff, {}, {}, {}, mongoose.Document<unknown, {}, IStaff, {}, {}> & IStaff & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Staff.d.ts.map