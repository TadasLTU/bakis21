const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const Calandar_Event = mongoose.model('Event', eventSchema);

module.exports = Calandar_Event;
