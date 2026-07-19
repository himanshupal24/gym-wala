import mongoose, { Schema, Document } from 'mongoose';

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

const SubscriptionSchema: Schema = new Schema({
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Cancelled', 'PendingPayment'], default: 'Active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amountPaid: { type: Number, required: true },
  invoiceId: { type: String, required: true }
}, { timestamps: true });

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
