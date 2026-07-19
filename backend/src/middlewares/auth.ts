import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgymwala';

export interface AuthRequest extends Request {
  user?: IAdmin;
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
    
    const user = await Admin.findById(decoded.id).populate('role').select('-passwordHash');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is suspended' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
