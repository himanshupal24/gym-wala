import { Request, Response } from 'express';
import { Plan } from '../models/Plan';
import { Subscription } from '../models/Subscription';

// PLan Controllers
export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Subscription Controllers
export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('gym', 'name location')
      .populate('plan', 'name price')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
