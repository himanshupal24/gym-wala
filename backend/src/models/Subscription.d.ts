import mongoose, { Document } from 'mongoose';
export interface ISubscription extends Document {
    gym: mongoose.Types.ObjectId;
    plan: mongoose.Types.ObjectId;
    status: 'Active' | 'Expired' | 'Cancelled' | 'PendingPayment';
    startDate: Date;
    endDate: Date;
    amountPaid: number;
    invoiceId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Subscription: mongoose.Model<ISubscription, {}, {}, {}, mongoose.Document<unknown, {}, ISubscription, {}, {}> & ISubscription & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Subscription.d.ts.map