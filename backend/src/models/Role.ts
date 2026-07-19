import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description: string;
  permissions: mongoose.Types.ObjectId[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  isSystem: { type: Boolean, default: false } // Prevents deletion of core roles like 'Super Admin'
}, { timestamps: true });

export const Role = mongoose.model<IRole>('Role', RoleSchema);
