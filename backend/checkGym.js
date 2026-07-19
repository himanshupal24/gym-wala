const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://himanshupal2412_db_user:zFhClpd6dzNZ8Mxn@cluster0.ut5e8ws.mongodb.net/gymwala?appName=Cluster0';

async function checkGym() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const Owner = mongoose.models.Owner || mongoose.model('Owner', new mongoose.Schema({}, { strict: false }));
    const Gym = mongoose.models.Gym || mongoose.model('Gym', new mongoose.Schema({}, { strict: false }));

    const owner = await Owner.findOne({ email: 'owner@mygym.com' });
    console.log('Owner ID:', owner._id.toString());

    const gym = await Gym.findOne();
    if (gym) {
      console.log('Gym found! Gym Owner ID:', gym.owner ? gym.owner.toString() : 'NO OWNER FIELD');
      console.log('Gym Name:', gym.name);
      
      // Fix it if they don't match
      if (gym.owner && gym.owner.toString() !== owner._id.toString()) {
        console.log('Mismatched Owner ID. Fixing...');
        gym.owner = owner._id;
        await gym.save();
        console.log('✅ Fixed Gym owner reference');
      } else if (!gym.owner) {
        gym.owner = owner._id;
        await gym.save();
        console.log('✅ Set missing Gym owner reference');
      }
    } else {
      console.log('No Gym found in database!');
    }

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkGym();
