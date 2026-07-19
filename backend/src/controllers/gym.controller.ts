import { Request, Response } from 'express';
import { Gym } from '../models/Gym';

export const getGyms = async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    
    // In production, implement real pagination here
    const gyms = await Gym.find(filter).populate('owner', 'firstName lastName email').sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: gyms });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGym = async (req: Request, res: Response) => {
  try {
    const { name, owner, location, subscriptionPlan } = req.body;

    if (!name || !owner || !location?.address || !location?.city || !location?.state || !location?.country) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const gym = await Gym.create({
      name,
      owner,
      location,
      subscriptionPlan: subscriptionPlan || 'Starter',
      status: 'Pending'
    });

    const populatedGym = await Gym.findById(gym._id).populate('owner', 'firstName lastName email');
    res.status(201).json({ success: true, data: populatedGym });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGymStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Active, Suspended, Pending

    if (!['Active', 'Suspended', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const gym = await Gym.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!gym) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    res.status(200).json({ success: true, data: gym });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGym = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findByIdAndDelete(id);
    
    if (!gym) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    res.status(200).json({ success: true, message: 'Gym deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
