import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import '../models/Role';
import { verifyPassword, generateToken } from '../utils/auth';
import { AuthRequest } from '../middlewares/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email }).select('+passwordHash').populate('role');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(401).json({ success: false, message: 'Account is suspended' });
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
