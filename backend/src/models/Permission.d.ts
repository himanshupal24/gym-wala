import mongoose, { Document } from 'mongoose';
export interface IPermission extends Document {
    name: string;
    module: string;
    action: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Permission: mongoose.Model<IPermission, {}, {}, {}, mongoose.Document<unknown, {}, IPermission, {}, {}> & IPermission & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Permission.d.ts.map