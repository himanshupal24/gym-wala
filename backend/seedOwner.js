const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/?appName=Cluster0';

async function seedOwner() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Mongoose Models
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

    // Handle existing models if they exist
    const Owner = mongoose.models.Owner || mongoose.model('Owner', ownerSchema);
    const Gym = mongoose.models.Gym || mongoose.model('Gym', gymSchema);

    const email = 'owner@mygym.com';
    const password = 'password123';

    let owner = await Owner.findOne({ email });

    if (!owner) {
      console.log('Owner not found, creating...');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      owner = new Owner({
        firstName: 'John',
        lastName: 'Doe',
        email,
        passwordHash,
        phone: '1234567890'
      });
      await owner.save();
      console.log('Owner created:', email);

      const gym = new Gym({
        name: 'My Gym',
        owner: owner._id
      });
      await gym.save();
      console.log('Gym created for owner');
    } else {
      console.log('Owner already exists:', email);
    }

    console.log('--- CREDENTIALS ---');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('-------------------');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedOwner();
