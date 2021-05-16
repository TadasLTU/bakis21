const mongoose = require('mongoose');

const ControlerSchema = new mongoose.Schema({
    createDate: {
        type: String,
        default: Date.now,
        required: true
    },
    installDate: {
        type: Date,
        default: '-1',
        required: false
    },
    assignedRoomID: {
        type: String,
        default: '-1',
        required: false
    },
    valves: {
        valveID: {
            type: String,
            default: '-1',
            required: false
        },
        vsn: {
            type: String,
            default: '-1',
            required: false
        },
        comment: {
            type: String,
            default: '-1',
            required: false
        },      
        // type: array,
        default: [],
        required: false
    },
    windowsensors: {
        sensorID: {
            type: String,
            default: '-1',
            required: false
        },
        wsn: {
            type: String,
            default: '-1',
            required: false
        },
        comment: {
            type: String,
            default: '-1',
            required: false
        },      
        // type: array,
        default: [],
        required: false
    },
    controlerSensors: {
        temperature: {
            installed: {
                type: Boolean,
                default: false,
                required: false
            },
            deviation: {
                type: Number,
                default: '-1',
                required: false
            },
            type: {
                type: String,
                default: '-1',
                required: false
            }, 
            coment: {
                type: String,
                default: '-1',
                required: false
            },     
            // type: array,
            default: [],
            required: false
        },
        humidity: {
            installed: {
                type: Boolean,
                default: false,
                required: false
            },
            deviation: {
                type: Number,
                default: '-1',
                required: false
            },
            type: {
                type: String,
                default: '-1',
                required: false
            }, 
            coment: {
                type: String,
                default: '-1',
                required: false
            },     
            // type: array,
            default: [],
            required: false
        },
        prescense: {
            installed: {
                type: Boolean,
                default: false,
                required: false
            },
            deviation: {
                type: Number,
                default: '-1',
                required: false
            },
            type: {
                type: String,
                default: '-1',
                required: false
            }, 
            coment: {
                type: String,
                default: '-1',
                required: false
            },     
            // type: array,
            default: [],
            required: false
        },
        csn: {
            type: String,
            default: '-1',
            required: false
        },
        comment: {
            type: String,
            default: '-1',
            required: false
        },      
        // type: array,
        default: [],
        required: false
    },
    desiredTemp: {
        type: Number,
        default: '20',
        required: false
    }, 
    serverIP: {
        type: String,
        default: '',
        required: false
    }, 
    controlerIP: {
        type: String,
        default: '-1',
        required: false
    }, 
    syncNeeded: {
        type: Boolean,
        default: false,
        required: false
    }, 
    syncInterval: {
        type: Number,
        default: 600,
        required: false
    }, 
    coment: {
        type: String,
        default: '-1',
        required: false
    },

});

const Controler = mongoose.model('Controler', ControlerSchema);

module.exports = Controler;