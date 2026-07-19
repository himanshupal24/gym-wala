import mongoose, { Schema, Document } from 'mongoose';

export interface IMembershipPlan extends Document {
  name: string;
  description: string;
  price: number;
  durationInMonths: number;
  gym: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MembershipPlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  durationInMonths: { type: Number, required: true, default: 1 },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// A gym should not have two active plans with the exact same name
MembershipPlanSchema.index({ name: 1, gym: 1 }, { unique: true });

export const MembershipPlan = mongoose.model<IMembershipPlan>('MembershipPlan', MembershipPlanSchema);
