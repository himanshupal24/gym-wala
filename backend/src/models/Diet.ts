import mongoose, { Schema, Document } from 'mongoose';

export interface IDiet extends Document {
  title: string;
  member: mongoose.Types.ObjectId;
  trainer: mongoose.Types.ObjectId;
  gym: mongoose.Types.ObjectId;
  meals: {
    time: string;
    description: string;
    calories?: number;
  }[];
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DietSchema: Schema = new Schema({
  title: { type: String, required: true },
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  trainer: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  meals: [{
    time: { type: String, required: true }, // e.g. "Breakfast", "08:00 AM"
    description: { type: String, required: true },
    calories: { type: Number }
  }],
  notes: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

DietSchema.index({ gym: 1, member: 1 });

export const Diet = mongoose.model<IDiet>('Diet', DietSchema);
