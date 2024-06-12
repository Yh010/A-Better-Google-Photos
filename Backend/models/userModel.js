const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    /* db_id: {
        type: Number,
        required: true,
    } */
    // Additional fields can be added here
});

module.exports = mongoose.model('User', userSchema);
