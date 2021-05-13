var express = require('express');
var router = express.Router();

// // Login restriction
// const User = require('../models/User');
// const passport = require('passport');
// const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res) 
{
    res.send("This is System API base, please use appropriate functions.");
        
});

router.get('/settingsSync', function(req, res) 
{
    res.send("This is settingsSync");
    // :ID
        
});

router.get('/ping', function(req, res) 
{
    res.send("This is ping");
        
});

router.get('/checkSync', function(req, res) 
{
    res.send("This is checkSync");
    // :ID
        
});

router.get('/dataSync', function(req, res) 
{
    res.send("This is dataSync");
    // :ID
        
});

module.exports = router;

// Functions to DO
// Put data | data sync
// Ping     | By directional?
// Check sync | check if settings sync is required
// Settings sync | sinchronise settings