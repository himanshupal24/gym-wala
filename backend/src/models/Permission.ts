import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  module: string;
  action: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  module: { type: String, required: true }, // e.g., 'gyms', 'users', 'billing'
  action: { type: String, required: true }, // e.g., 'read', 'write', 'delete'
  description: { type: String }
}, { timestamps: true });

export const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);
