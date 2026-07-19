import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  member: mongoose.Types.ObjectId;
  trainer: mongoose.Types.ObjectId;
  gym: mongoose.Types.ObjectId;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    notes?: string;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema({
  title: { type: String, required: true },
  member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  trainer: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
  gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    notes: { type: String }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

WorkoutSchema.index({ gym: 1, member: 1 });

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
