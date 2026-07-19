import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  gym: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId; // User (Owner/Admin) or Staff who posted it
  priority: 'Low' | 'Medium' | 'High';
  targetAudience: 'All' | 'Active Members' | 'Staff';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  targetAudience: { type: String, enum: ['All', 'Active Members', 'Staff'], default: 'All' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

AnnouncementSchema.index({ gym: 1, createdAt: -1 });

export const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
