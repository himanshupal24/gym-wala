import mongoose, { Schema, Document } from 'mongoose';

export interface IOwner extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  status: 'Active' | 'Suspended' | 'Pending';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OwnerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Suspended', 'Pending'], default: 'Pending' },
  lastLogin: { type: Date }
}, { timestamps: true });

export const Owner = mongoose.model<IOwner>('Owner', OwnerSchema);
