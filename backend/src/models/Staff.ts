import mongoose, { Schema, Document } from 'mongoose';

export interface IStaff extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Trainer' | 'Receptionist' | 'Manager';
  gym: mongoose.Types.ObjectId;
  status: 'Active' | 'Inactive';
  schedule?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['Trainer', 'Receptionist', 'Manager'], required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  schedule: { type: String }
}, { timestamps: true });

StaffSchema.index({ gym: 1 });

StaffSchema.index({ status: 1 });

export const Staff = mongoose.model<IStaff>('Staff', StaffSchema);
