import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from './src/models/Admin';
import { Role } from './src/models/Role';
import { hashPassword } from './src/utils/auth';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymwala');
    
    // Check if role exists
    let superAdminRole = await Role.findOne({ name: 'Super Admin' });
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: 'Super Admin',
        description: 'System administrator with full access',
        permissions: []
      });
      console.log('Created Super Admin Role');
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email: 'admin@gymwala.com' });
    if (adminExists) {
      console.log('Super Admin already exists.');
      process.exit(0);
    }

    const passwordHash = await hashPassword('password123');
    
    await Admin.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@gymwala.com',
      passwordHash,
      role: superAdminRole._id,
      isActive: true
    });

    console.log('Successfully created super admin:');
    console.log('Email: admin@gymwala.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
