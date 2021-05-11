var express = require('express');
var router = express.Router();

// // Login restriction
const User = require('../models/User');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) 
{
    res.render('index');
        
});

router.get('/show', ensureAuthenticated, function(req, res) 
{
    res.render('dataOveview');
        
});

router.get('/add', ensureAuthenticated, function(req, res) 
{
    res.render('addRoom');
        
});

module.exports = router;

