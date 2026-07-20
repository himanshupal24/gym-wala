import mongoose, { Document } from 'mongoose';
export interface IAnnouncement extends Document {
    title: string;
    message: string;
    gym: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    priority: 'Low' | 'Medium' | 'High';
    targetAudience: 'All' | 'Active Members' | 'Staff';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Announcement: mongoose.Model<IAnnouncement, {}, {}, {}, mongoose.Document<unknown, {}, IAnnouncement, {}, {}> & IAnnouncement & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Announcement.d.ts.map