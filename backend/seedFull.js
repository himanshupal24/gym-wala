const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/gymwala?appName=Cluster0';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting Seeding Process...');

    const salt = await bcrypt.genSalt(10);

    // 0. Seed Role
    const roleSchema = new mongoose.Schema({
      name: { type: String, required: true },
      permissions: [{ type: String }]
    }, { timestamps: true });
    const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
    
    let adminRole = await Role.findOne({ name: 'Super Admin' });
    if (!adminRole) {
      adminRole = new Role({ name: 'Super Admin', permissions: ['all'] });
      await adminRole.save();
    }

    // 1. Seed Super Admin
    const adminSchema = new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      passwordHash: { type: String, required: true },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
      isActive: { type: Boolean, default: true }
    }, { timestamps: true });
    
    // Clear out the bad Admin record if it exists (from previous faulty seed)
    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
    await Admin.deleteOne({ email: 'admin@gymwala.com' });

    const adminEmail = 'admin@gymwala.com';
    const adminPassword = 'adminpassword123';
    
    const adminHash = await bcrypt.hash(adminPassword, salt);
    const admin = new Admin({ 
      firstName: 'Super', 
      lastName: 'Admin', 
      email: adminEmail, 
      passwordHash: adminHash,
      role: adminRole._id
    });
    await admin.save();
    console.log('✅ Super Admin created:', adminEmail);

    console.log('\n==================================');
    console.log('🎉 SEEDING COMPLETE! 🎉');
    console.log('==================================');
    console.log('SUPER ADMIN PORTAL CREDENTIALS');
    console.log(`Email: ${adminEmail} | Password: ${adminPassword}`);
    console.log('==================================\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
}

seedDatabase();
