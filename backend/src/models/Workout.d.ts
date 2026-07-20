import mongoose, { Document } from 'mongoose';
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
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, {}> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Workout.d.ts.map