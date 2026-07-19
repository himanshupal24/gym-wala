import { Request, Response } from 'express';
import { MembershipPlan } from '../models/MembershipPlan';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getPlans = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    
    if (gymId) {
      filter.gym = gymId;
    } else if (req.user?.type === 'Owner') {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    const plans = await MembershipPlan.find(filter).sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPlan = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    const { name, description, price, durationInMonths, isActive } = req.body;
    
    const newPlan = new MembershipPlan({
      name,
      description,
      price,
      durationInMonths,
      isActive,
      gym: gymId
    });

    await newPlan.save();
    res.status(201).json({ success: true, data: newPlan });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A plan with this name already exists for your gym' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const gymId = await getGymIdForRequest(req);
    
    const plan = await MembershipPlan.findById(id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    if (req.user?.type === 'Owner' && plan.gym.toString() !== gymId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedPlan = await MembershipPlan.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedPlan });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A plan with this name already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const gymId = await getGymIdForRequest(req);
    
    const plan = await MembershipPlan.findById(id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    if (req.user?.type === 'Owner' && plan.gym.toString() !== gymId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await plan.deleteOne();
    res.status(200).json({ success: true, message: 'Plan deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
