import { Request, Response } from 'express';
import { Gym } from '../models/Gym';
import { Member } from '../models/Member';
import { Attendance } from '../models/Attendance';
import { AuthRequest } from '../middlewares/auth';

export const getGymForCheckin = async (req: Request, res: Response) => {
  try {
    const { gymUniqueCode } = req.params;
    
    if (!gymUniqueCode) {
      return res.status(400).json({ success: false, message: 'Gym code is required' });
    }

    const gym = await Gym.findOne({ gymUniqueCode, qrStatus: 'Active', qrEnabled: true });
    
    if (!gym) {
      return res.status(404).json({ success: false, message: 'Invalid or deactivated Gym QR Code' });
    }

    res.status(200).json({
      success: true,
      gym: {
        id: gym._id,
        name: gym.name,
        location: gym.location
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const processQRCheckin = async (req: AuthRequest, res: Response) => {
  try {
    const { gymUniqueCode } = req.body;
    const user = req.user;

    if (!user || user.type !== 'Member') {
      return res.status(401).json({ success: false, message: 'Only members can check in' });
    }

    const gym = await Gym.findOne({ gymUniqueCode, qrStatus: 'Active', qrEnabled: true });
    
    if (!gym) {
      return res.status(404).json({ success: false, message: 'Invalid or deactivated Gym QR Code' });
    }

    // Verify member belongs to this gym
    const member = await Member.findById(user.id);
    if (!member || member.gym.toString() !== gym._id.toString()) {
      return res.status(403).json({ success: false, message: 'You do not belong to this gym' });
    }

    if (member.status !== 'Active') {
      return res.status(403).json({ success: false, message: 'Your membership is not active' });
    }

    // Check if already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      member: member._id,
      gym: gym._id,
      date: { $gte: startOfDay }
    });

    if (existingAttendance) {
      return res.status(200).json({ 
        success: true, 
        alreadyCheckedIn: true, 
        message: 'You have already checked in today',
        attendance: existingAttendance
      });
    }

    // Mark attendance
    const attendance = new Attendance({
      member: member._id,
      gym: gym._id,
      date: startOfDay,
      status: 'Present',
      checkInTime: new Date(),
      attendanceSource: 'QR',
      device: req.headers['user-agent'],
      ipAddress: req.ip
    });

    await attendance.save();

    member.lastAttendance = new Date();
    member.lastCheckIn = new Date();
    await member.save();

    res.status(200).json({
      success: true,
      alreadyCheckedIn: false,
      message: 'Check-in successful',
      attendance
    });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
