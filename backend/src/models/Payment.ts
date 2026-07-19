import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  member: mongoose.Types.ObjectId;
  gym: mongoose.Types.ObjectId;
  plan?: mongoose.Types.ObjectId; // Optional: linked to a specific plan
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  method: 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';
  transactionId?: string;
  paymentDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  plan: { type: Schema.Types.ObjectId, ref: 'MembershipPlan' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
  method: { type: String, enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'], required: true },
  transactionId: { type: String },
  paymentDate: { type: Date, required: true, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

PaymentSchema.index({ gym: 1, paymentDate: -1 });
PaymentSchema.index({ member: 1, paymentDate: -1 });

PaymentSchema.index({ status: 1 });

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
