const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/gymwala?appName=Cluster0';

// Import or define models (doing inline definitions for simplicity and ensuring they exist)
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ownerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: { type: String }
}, { timestamps: true });

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
}, { timestamps: true });

const memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  status: String,
  membershipType: String,
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  joinDate: { type: Date, default: Date.now },
  lastCheckIn: Date
});

const planSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  durationInMonths: Number,
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  isActive: Boolean
});

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  amount: Number,
  status: String,
  method: String,
  paymentDate: { type: Date, default: Date.now }
});

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
  date: Date,
  status: String,
  checkInTime: { type: Date, default: Date.now }
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Owner = mongoose.models.Owner || mongoose.model('Owner', ownerSchema);
const Gym = mongoose.models.Gym || mongoose.model('Gym', gymSchema);
const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
const MembershipPlan = mongoose.models.MembershipPlan || mongoose.model('MembershipPlan', planSchema);
const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Starting Seeding Process...');

    const salt = await bcrypt.genSalt(10);

    // 1. Seed Super Admin
    const adminEmail = 'admin@gymwala.com';
    const adminPassword = 'adminpassword123';
    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      const adminHash = await bcrypt.hash(adminPassword, salt);
      admin = new Admin({ name: 'Super Admin', email: adminEmail, passwordHash: adminHash });
      await admin.save();
      console.log('✅ Super Admin created:', adminEmail);
    } else {
      console.log('⚡ Super Admin already exists:', adminEmail);
    }

    // 2. Seed Owner and Gym
    const ownerEmail = 'owner@mygym.com';
    const ownerPassword = 'password123';
    let owner = await Owner.findOne({ email: ownerEmail });
    let gym;
    if (!owner) {
      const ownerHash = await bcrypt.hash(ownerPassword, salt);
      owner = new Owner({ firstName: 'Alex', lastName: 'Owner', email: ownerEmail, passwordHash: ownerHash, phone: '555-1234' });
      await owner.save();
      
      gym = new Gym({ name: 'Iron Will Fitness', owner: owner._id });
      await gym.save();
      console.log('✅ Owner and Gym created:', ownerEmail);
    } else {
      console.log('⚡ Owner already exists:', ownerEmail);
      gym = await Gym.findOne({ owner: owner._id });
    }

    // 3. Seed Membership Plans for this gym
    const plansCount = await MembershipPlan.countDocuments({ gym: gym._id });
    let plan1, plan2;
    if (plansCount === 0) {
      plan1 = new MembershipPlan({ name: 'Monthly Standard', description: 'Access to gym floor', price: 50, durationInMonths: 1, gym: gym._id, isActive: true });
      plan2 = new MembershipPlan({ name: 'Yearly Pro', description: 'Access to gym floor and classes', price: 450, durationInMonths: 12, gym: gym._id, isActive: true });
      await MembershipPlan.insertMany([plan1, plan2]);
      console.log('✅ Seeded Membership Plans');
    } else {
      plan1 = await MembershipPlan.findOne({ gym: gym._id, name: 'Monthly Standard' });
      plan2 = await MembershipPlan.findOne({ gym: gym._id, name: 'Yearly Pro' });
    }

    // 4. Seed Members for this gym
    const membersCount = await Member.countDocuments({ gym: gym._id });
    let members = [];
    if (membersCount < 5) {
      const newMembers = [
        { firstName: 'Bruce', lastName: 'Wayne', email: 'bruce@example.com', phone: '111-2222', status: 'Active', membershipType: 'Yearly Pro', gym: gym._id, joinDate: new Date('2023-01-15') },
        { firstName: 'Clark', lastName: 'Kent', email: 'clark@example.com', phone: '333-4444', status: 'Active', membershipType: 'Monthly Standard', gym: gym._id, joinDate: new Date('2023-05-10') },
        { firstName: 'Diana', lastName: 'Prince', email: 'diana@example.com', phone: '555-6666', status: 'Active', membershipType: 'Yearly Pro', gym: gym._id, joinDate: new Date('2023-11-01') },
        { firstName: 'Barry', lastName: 'Allen', email: 'barry@example.com', phone: '777-8888', status: 'Inactive', membershipType: 'Monthly Standard', gym: gym._id, joinDate: new Date('2022-04-12') },
      ];
      members = await Member.insertMany(newMembers);
      console.log('✅ Seeded Members');
    } else {
      members = await Member.find({ gym: gym._id }).limit(4);
    }

    // 5. Seed Payments
    const paymentsCount = await Payment.countDocuments({ gym: gym._id });
    if (paymentsCount < 3 && plan1 && plan2 && members.length > 0) {
      const payments = [
        { member: members[0]._id, gym: gym._id, plan: plan2._id, amount: 450, status: 'Completed', method: 'UPI', paymentDate: new Date() },
        { member: members[1]._id, gym: gym._id, plan: plan1._id, amount: 50, status: 'Completed', method: 'Cash', paymentDate: new Date() },
        { member: members[2]._id, gym: gym._id, plan: plan2._id, amount: 450, status: 'Pending', method: 'Bank Transfer', paymentDate: new Date() }
      ];
      await Payment.insertMany(payments);
      console.log('✅ Seeded Payments');
    }

    // 6. Seed Attendance
    const attendanceCount = await Attendance.countDocuments({ gym: gym._id });
    if (attendanceCount < 3 && members.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const attendances = [
        { member: members[0]._id, gym: gym._id, date: today, status: 'Present', checkInTime: new Date(new Date().setHours(8, 30, 0, 0)) },
        { member: members[1]._id, gym: gym._id, date: today, status: 'Present', checkInTime: new Date(new Date().setHours(9, 15, 0, 0)) },
        { member: members[2]._id, gym: gym._id, date: today, status: 'Late', checkInTime: new Date(new Date().setHours(11, 45, 0, 0)) }
      ];
      await Attendance.insertMany(attendances);
      console.log('✅ Seeded Attendance');
    }

    console.log('\n==================================');
    console.log('🎉 SEEDING COMPLETE! 🎉');
    console.log('==================================');
    console.log('SUPER ADMIN PORTAL CREDENTIALS');
    console.log(`Email: ${adminEmail} | Password: ${adminPassword}`);
    console.log('----------------------------------');
    console.log('OWNER PORTAL CREDENTIALS');
    console.log(`Email: ${ownerEmail} | Password: ${ownerPassword}`);
    console.log('==================================\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
}

seedDatabase();
