const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    controlID: {
        type: String,
        default: '-1',
        required: false
    },
    roomCname: {
        type: String,
        required: true
    },
    installDate: {
        type: Date,
        default: Date.now
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

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;