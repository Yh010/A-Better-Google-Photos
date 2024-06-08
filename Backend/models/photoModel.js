// photoModel.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user who uploaded the photo
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
