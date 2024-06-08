const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    // Additional fields can be added here
});

module.exports = mongoose.model('User', userSchema);
