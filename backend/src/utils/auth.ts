import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAdmin } from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgymwala';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (admin: IAdmin): string => {
  return jwt.sign(
    { 
      id: admin._id,
      email: admin.email,
      role: admin.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as any }
  );
};
