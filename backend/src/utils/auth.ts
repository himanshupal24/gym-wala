import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgymwala';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: any, type: string = 'Admin'): string => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role,
      type: type
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN as any }
  );
};
