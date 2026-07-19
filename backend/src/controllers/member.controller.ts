import { Request, Response } from 'express';
import { Member } from '../models/Member';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const filter = status && status !== 'All' ? { status } : {};
    
    const members = await Member.find(filter)
      .populate('gym', 'name location')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMemberAnalytics = async (req: Request, res: Response) => {
  try {
    // Generate some mock aggregate analytics since we lack real historical data
    const analytics = {
      totalMembers: await Member.countDocuments(),
      activeMembers: await Member.countDocuments({ status: 'Active' }),
      retentionRate: 92.4, // mock percentage
      newMembersThisMonth: 124, // mock
      activityTrend: [
        { day: 'Mon', active: 1200 },
        { day: 'Tue', active: 1400 },
        { day: 'Wed', active: 1350 },
        { day: 'Thu', active: 1500 },
        { day: 'Fri', active: 1600 },
        { day: 'Sat', active: 900 },
        { day: 'Sun', active: 850 },
      ]
    };
    
    res.status(200).json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMemberStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive', 'Suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const member = await Member.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
