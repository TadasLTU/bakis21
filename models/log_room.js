const mongoose = require('mongoose');

const logRoom = new mongoose.Schema({
    roomID: {
        type: String,
        default: '-1',
        required: true
    },
    roomControlID: {
        type: String,
        default: '-1',
        required: true
    },
    setTemp: {
        type: Number,
        required: true
    },
    realTemp: {
        type: Number,
        required: true
    },
    roomInfo: {
        type: String,
        required: false
    },
    roomNumber: {
        type: String,
        required: false
    },
});

const logRoom = mongoose.model('log_room', loogRoomSchema);

module.exports = Room;