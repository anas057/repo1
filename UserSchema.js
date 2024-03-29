const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
  profilepic: {
    type: String,
    default: null,
  },
  email: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);