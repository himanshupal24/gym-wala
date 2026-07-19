import { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
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

export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    
    if (gymId) {
      filter.gym = gymId;
    } else if (req.user?.type === 'Owner') {
      return res.status(404).json({ success: false, message: 'Gym not found' });
    }

    if (req.query.date) {
      const queryDate = new Date(req.query.date as string);
      const nextDay = new Date(queryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.date = { $gte: queryDate, $lt: nextDay };
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate('member', 'firstName lastName email')
      .sort({ checkInTime: -1 });

    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const { memberId, status } = req.body;
    
    const member = await Member.findById(memberId);
    if (!member || member.gym.toString() !== gymId) {
      return res.status(404).json({ success: false, message: 'Member not found in your gym' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newAttendance = new Attendance({
      member: memberId,
      gym: gymId,
      date: today,
      status: status || 'Present'
    });

    await newAttendance.save();
    
    // Update last check-in on member
    member.lastCheckIn = new Date();
    await member.save();

    const populatedRecord = await Attendance.findById(newAttendance._id).populate('member', 'firstName lastName email');

    res.status(201).json({ success: true, data: populatedRecord });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
