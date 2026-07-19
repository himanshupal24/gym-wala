import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from '../models/Admin';
import { Owner, IOwner } from '../models/Owner';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgymwala';

export type UserType = (IAdmin | IOwner) & { type: 'Admin' | 'Owner' };

export interface AuthRequest extends Request {
  user?: UserType;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    let user: any = null;
    let type = decoded.type || 'Admin'; // Default to Admin for older tokens

    if (type === 'Owner') {
      user = await Owner.findById(decoded.id).select('-passwordHash');
    } else {
      user = await Admin.findById(decoded.id).populate('role').select('-passwordHash');
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }
    
    if (type === 'Admin' && !user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is suspended' });
    }

    // Attach type explicitly since mongoose doc doesn't inherently have it
    const userObj = user.toObject();
    userObj.type = type;
    userObj.id = user._id;
    
    req.user = userObj;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
