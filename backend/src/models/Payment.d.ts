import mongoose, { Document } from 'mongoose';
export interface IPayment extends Document {
    member: mongoose.Types.ObjectId;
    gym: mongoose.Types.ObjectId;
    plan?: mongoose.Types.ObjectId;
    amount: number;
    status: 'Completed' | 'Pending' | 'Failed';
    method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
    transactionId?: string;
    paymentDate: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Payment: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}, {}> & IPayment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Payment.d.ts.map