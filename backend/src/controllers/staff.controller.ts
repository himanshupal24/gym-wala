import { Request, Response } from 'express';
import { Staff } from '../models/Staff';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getStaff = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    if (gymId) filter.gym = gymId;

    const staff = await Staff.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: staff });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const newStaff = new Staff({ ...req.body, gym: gymId });
    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    const staff = await Staff.findById(req.params.id);
    if (!staff || (req.user?.type === 'Owner' && staff.gym.toString() !== gymId)) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStaff = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    const staff = await Staff.findById(req.params.id);
    if (!staff || (req.user?.type === 'Owner' && staff.gym.toString() !== gymId)) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    await staff.deleteOne();
    res.status(200).json({ success: true, message: 'Staff deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
