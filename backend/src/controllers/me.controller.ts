import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { Member } from '../models/Member';
import { Attendance } from '../models/Attendance';
import { Payment } from '../models/Payment';

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const member = await Member.findById(req.user?.id).populate('gym', 'name location');
    if (!member) return res.status(404).json({ success: false, message: 'Profile not found' });
    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const attendance = await Attendance.find({ member: req.user?.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyPayments = async (req: AuthRequest, res: Response) => {
  try {
    const payments = await Payment.find({ member: req.user?.id }).populate('plan', 'name').sort({ paymentDate: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
