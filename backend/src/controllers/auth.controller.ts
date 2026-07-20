import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { Owner } from '../models/Owner';
import { Member } from '../models/Member';
import '../models/Role';
import { verifyPassword, generateToken } from '../utils/auth';
import { AuthRequest } from '../middlewares/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    let user: any = await Admin.findOne({ email }).select('+passwordHash').populate('role');
    let userType = 'Admin';

    if (!user) {
      user = await Owner.findOne({ email }).select('+passwordHash');
      userType = 'Owner';
    }

    if (!user) {
      user = await Member.findOne({ email }).select('+passwordHash');
      userType = 'Member';
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (userType === 'Admin' && !user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is suspended' });
    } else if (userType === 'Owner' && user.status !== 'Active') {
      return res.status(401).json({ success: false, message: 'Account is not active' });
    } else if (userType === 'Member' && user.status !== 'Active') {
      return res.status(401).json({ success: false, message: 'Member account is not active' });
    }

    const isMatch = await verifyPassword(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user, userType);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: userType === 'Admin' ? user.role : { name: userType },
        type: userType,
        gymId: user.gym ? user.gym : undefined
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
