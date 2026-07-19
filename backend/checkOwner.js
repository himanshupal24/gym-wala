const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/gymwala?appName=Cluster0';

async function checkOwner() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const ownerSchema = new mongoose.Schema({
      email: String,
      status: String
    }, { strict: false });
    const Owner = mongoose.models.Owner || mongoose.model('Owner', ownerSchema);

    let owner = await Owner.findOne({ email: 'owner@mygym.com' });
    
    if (owner) {
      owner.status = 'Active';
      await owner.save();
      console.log('✅ Set owner status to Active.');
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkOwner();
