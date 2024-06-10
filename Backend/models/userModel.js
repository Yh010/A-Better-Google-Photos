const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // Additional fields can be added here
});

module.exports = mongoose.model('User', userSchema);
