import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: any;
  group: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  group: { type: String, required: true }, // e.g., 'smtp', 'general', 'branding'
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

export const Setting = mongoose.model<ISetting>('Setting', SettingSchema);
