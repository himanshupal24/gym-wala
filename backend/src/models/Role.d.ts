import mongoose, { Document } from 'mongoose';
export interface IRole extends Document {
    name: string;
    description: string;
    permissions: mongoose.Types.ObjectId[];
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Role: mongoose.Model<IRole, {}, {}, {}, mongoose.Document<unknown, {}, IRole, {}, {}> & IRole & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Role.d.ts.map