import mongoose, { Document } from 'mongoose';
export interface IAttendance extends Document {
    member: mongoose.Types.ObjectId;
    gym: mongoose.Types.ObjectId;
    date: Date;
    status: 'Present' | 'Late';
    checkInTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Attendance: mongoose.Model<IAttendance, {}, {}, {}, mongoose.Document<unknown, {}, IAttendance, {}, {}> & IAttendance & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Attendance.d.ts.map