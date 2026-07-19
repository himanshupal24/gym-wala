import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  member: mongoose.Types.ObjectId;
  gym: mongoose.Types.ObjectId;
  date: Date;
  status: 'Present' | 'Late';
  checkInTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema({
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  date: { type: Date, required: true }, // Normalized to start of day
  status: { type: String, enum: ['Present', 'Late'], default: 'Present' },
  checkInTime: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

// A member can generally only check in once per day per gym, but we'll just index for fast queries
AttendanceSchema.index({ gym: 1, date: -1 });
AttendanceSchema.index({ member: 1, date: -1 });

export const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
