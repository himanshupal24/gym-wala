import { Request, Response } from 'express';
import { Owner } from '../models/Owner';

export const getOwners = async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    
    // Select excludes passwordHash
    const owners = await Owner.find(filter).select('-passwordHash').sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: owners });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOwnerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Suspended', 'Pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const owner = await Owner.findByIdAndUpdate(id, { status }, { new: true }).select('-passwordHash');
    
    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }

    res.status(200).json({ success: true, data: owner });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByIdAndDelete(id);
    
    if (!owner) {
      return res.status(404).json({ success: false, message: 'Owner not found' });
    }

    // Optionally delete associated gyms here, or set them to Suspended. 
    // In production, we usually implement soft-deletes or archive records instead.

    res.status(200).json({ success: true, message: 'Owner deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
