import { Request, Response } from 'express';
import { Diet } from '../models/Diet';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getDiets = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    if (gymId) filter.gym = gymId;

    const diets = await Diet.find(filter)
      .populate('member', 'firstName lastName')
      .populate('trainer', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: diets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDiet = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const newDiet = new Diet({ ...req.body, gym: gymId });
    await newDiet.save();
    res.status(201).json({ success: true, data: newDiet });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDiet = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    const diet = await Diet.findById(req.params.id);
    if (!diet || (req.user?.type === 'Owner' && diet.gym.toString() !== gymId)) {
      return res.status(404).json({ success: false, message: 'Diet plan not found' });
    }

    await diet.deleteOne();
    res.status(200).json({ success: true, message: 'Diet plan deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
