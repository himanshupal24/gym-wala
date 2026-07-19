const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/gymwala?appName=Cluster0';

async function fixAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const Role = mongoose.models.Role || mongoose.model('Role', new mongoose.Schema({ name: String, permissions: [String] }, { strict: false }));
    const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      passwordHash: { type: String, required: true },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
      isActive: { type: Boolean, default: true }
    }, { strict: false }));

    let adminRole = await Role.findOne({ name: 'Super Admin' });
    if (!adminRole) {
      adminRole = new Role({ name: 'Super Admin', permissions: ['all'] });
      await adminRole.save();
      console.log('Created Super Admin Role');
    }

    let admin = await Admin.findOne({ email: 'admin@gymwala.com' });
    if (admin) {
      console.log('Admin found, updating missing fields...');
      admin.firstName = 'Super';
      admin.lastName = 'Admin';
      admin.role = adminRole._id;
      admin.isActive = true;
      
      await admin.save();
      console.log('✅ Admin account fixed successfully!');
    } else {
      console.log('Admin not found in DB!');
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

fixAdmin();
