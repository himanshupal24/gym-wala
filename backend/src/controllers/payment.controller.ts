import { Request, Response } from 'express';
import { Payment } from '../models/Payment';
import { Member } from '../models/Member';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getPayments = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    
    if (gymId) {
      filter.gym = gymId;
    } else if (req.user?.type === 'Owner') {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    const payments = await Payment.find(filter)
      .populate('member', 'firstName lastName email')
      .populate('plan', 'name')
      .sort({ paymentDate: -1 });

    res.status(200).json({ success: true, data: payments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recordPayment = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const { memberId, planId, amount, method, status, transactionId, notes } = req.body;
    
    const member = await Member.findById(memberId);
    if (!member || member.gym.toString() !== gymId) {
      return res.status(404).json({ success: false, message: 'Member not found in your gym' });
    }

    const newPayment = new Payment({
      member: memberId,
      gym: gymId,
      plan: planId,
      amount,
      method,
      status: status || 'Completed',
      transactionId,
      notes
    });

    await newPayment.save();
    
    const populatedPayment = await Payment.findById(newPayment._id)
      .populate('member', 'firstName lastName email')
      .populate('plan', 'name');

    res.status(201).json({ success: true, data: populatedPayment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
