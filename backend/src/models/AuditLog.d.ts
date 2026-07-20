import mongoose, { Document } from 'mongoose';
export interface IAuditLog extends Document {
    admin: mongoose.Types.ObjectId;
    action: string;
    resource: string;
    resourceId?: string;
    details: any;
    ipAddress?: string;
    createdAt: Date;
}
export declare const AuditLog: mongoose.Model<IAuditLog, {}, {}, {}, mongoose.Document<unknown, {}, IAuditLog, {}, {}> & IAuditLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=AuditLog.d.ts.map