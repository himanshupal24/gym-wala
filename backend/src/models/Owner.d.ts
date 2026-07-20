import mongoose, { Document } from 'mongoose';
export interface IOwner extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordHash: string;
    status: 'Active' | 'Suspended' | 'Pending';
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Owner: mongoose.Model<IOwner, {}, {}, {}, mongoose.Document<unknown, {}, IOwner, {}, {}> & IOwner & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Owner.d.ts.map