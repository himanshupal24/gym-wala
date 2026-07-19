import mongoose, { Schema, Document } from 'mongoose';

export interface IPlan extends Document {
  name: string; // Basic, Starter, Pro, Enterprise, Custom
  description: string;
  price: number;
  durationInMonths: number;
  memberLimit: number;
  branchLimit: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  durationInMonths: { type: Number, required: true, default: 1 },
  memberLimit: { type: Number, required: true },
  branchLimit: { type: Number, required: true },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);
