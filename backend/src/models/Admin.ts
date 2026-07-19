import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: mongoose.Types.ObjectId;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
