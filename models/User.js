const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rigths: {
        type: Array,
        default : [],
        required: false
    },
    firstLogin: {
        type: Boolean,
        default: true,
        required: false
    },
    tempPassword: {
        type: String,
        default: "",
        required: false
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;