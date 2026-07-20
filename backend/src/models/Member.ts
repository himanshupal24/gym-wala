import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gym: mongoose.Types.ObjectId;
  status: 'Active' | 'Inactive' | 'Suspended';
  membershipType: string;
  joinDate: Date;
  lastCheckIn?: Date;
  lastAttendance?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
  passwordHash: { type: String, select: false },
  qrCode: { type: String },
  membershipType: { type: String, default: 'Standard' },
  joinDate: { type: Date, default: Date.now },
  lastCheckIn: { type: Date },
  lastAttendance: { type: Date }
}, { timestamps: true });

// Ensure email is unique per gym
MemberSchema.index({ email: 1, gym: 1 }, { unique: true });

MemberSchema.index({ gym: 1 });
MemberSchema.index({ status: 1 });

export const Member = mongoose.model<IMember>('Member', MemberSchema);
