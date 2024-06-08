// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  uploadedPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }] // Reference to uploaded photos
});

const User = mongoose.model('User', userSchema);

module.exports = User;
