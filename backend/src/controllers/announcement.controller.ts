import { Request, Response } from 'express';
import { Announcement } from '../models/Announcement';
import { Gym } from '../models/Gym';
import { AuthRequest } from '../middlewares/auth';

const getGymIdForRequest = async (req: AuthRequest): Promise<string | null> => {
  if (req.user?.type === 'Owner') {
    const gym = await Gym.findOne({ owner: req.user.id });
    return gym ? gym._id.toString() : null;
  }
  return req.query.gymId as string || null;
};

export const getAnnouncements = async (req: AuthRequest, res: Response) => {
  try {
    const filter: any = {};
    const gymId = await getGymIdForRequest(req);
    if (gymId) filter.gym = gymId;

    const announcements = await Announcement.find(filter)
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    if (!gymId) return res.status(404).json({ success: false, message: 'Gym not found' });

    const newAnnouncement = new Announcement({
      ...req.body,
      gym: gymId,
      author: req.user?.id
    });
    
    await newAnnouncement.save();
    res.status(201).json({ success: true, data: newAnnouncement });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAnnouncement = async (req: AuthRequest, res: Response) => {
  try {
    const gymId = await getGymIdForRequest(req);
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement || (req.user?.type === 'Owner' && announcement.gym.toString() !== gymId)) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await announcement.deleteOne();
    res.status(200).json({ success: true, message: 'Announcement deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
