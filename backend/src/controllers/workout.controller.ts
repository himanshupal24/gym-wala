import { Request, Response } from 'express';
import { Workout } from '../models/Workout';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    if (gymId) filter.gym = gymId;

    const workouts = await Workout.find(filter)
      .populate('member', 'firstName lastName')
      .populate('trainer', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workouts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const newWorkout = new Workout({ ...req.body, gym: gymId });
    await newWorkout.save();
    res.status(201).json({ success: true, data: newWorkout });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    const workout = await Workout.findById(req.params.id);
    if (!workout || (req.user?.type === 'Owner' && workout.gym.toString() !== gymId)) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }

    await workout.deleteOne();
    res.status(200).json({ success: true, message: 'Workout deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
