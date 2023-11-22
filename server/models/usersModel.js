const mongoose = require('mongoose');
require('dotenv').config();
const Db = process.env.ATLAS_URI;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: Array,
    required: false
  }
});
mongoose.connect(Db, { useNewUrlParser: true, useUnifiedTopology: true })
const User = mongoose.model('User', userSchema);

User.saveUser = async function (userObj) {
  try{
    const newUser = new User(userObj);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

User.addSearchToHistory = async function (username, searchTerm) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    user.history.push({ searchTerm, timestamp: new Date() });

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;