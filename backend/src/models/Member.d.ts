import mongoose, { Document } from 'mongoose';
export interface IMember extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gym: mongoose.Types.ObjectId;
    status: 'Active' | 'Inactive' | 'Suspended';
    membershipType: string;
    joinDate: Date;
    lastCheckIn?: Date;
    lastAttendance?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Member: mongoose.Model<IMember, {}, {}, {}, mongoose.Document<unknown, {}, IMember, {}, {}> & IMember & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Member.d.ts.map