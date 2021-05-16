var express = require('express');
var router = express.Router();
const Controler = require('../models/room_control');

// // Login restriction
const User = require('../models/User');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) 
{
    res.render('index', { user: req.user });
        
});

router.get('/editSelection', ensureAuthenticated, function(req, res) 
{
    res.render('index', { user: req.user });
        
});

router.get('/add', ensureAuthenticated, function(req, res) 
{
    res.render('controlerData_AddNew', { user: req.user });
        
});

router.get('/edit/:ID', ensureAuthenticated, function(req, res) 
{
    res.render('index', { user: req.user });
        
});

router.post('/add', ensureAuthenticated, function(req, res) 
{
  var controlerData = req.params.ID;
  console.log(controlerData);
  
  console.log(req.body);
    const { 
        controler_instalDate,
        room_requiredTemp, 
        controler_ip, 
        controler_serverip, 
        controler_syncInt, 
        controler_SN, 
        controler_comment, 
        controler_controledRoom 
    } = req.body;
    let errors = [];  

    // if (errors.length > 0) 
    // {
    //   res.render('add', {
    //     errors,
    //     controler_instalDate,
    //     room_requiredTemp, 
    //     controler_ip, 
    //     controler_serverip, 
    //     controler_syncInt, 
    //     controler_SN, 
    //     controler_comment, 
    //     controler_controledRoom
    //   });
    // }
    // else
    // {
    //   console.log('Basic check pass');
    //   Controler.findOneAndUpdate({_id:selectedRoom}, 
    //     {
    //         controler_instalDate:controler_instalDate,
    //         room_requiredTemp:room_requiredTemp, 
    //         controler_ip:controler_ip, 
    //         controler_serverip:controler_serverip, 
    //         controler_syncInt:controler_syncInt, 
    //         controler_SN:controler_SN, 
    //         controler_comment:controler_comment, 
    //         controler_controledRoom:controler_controledRoom
    //     }, {upsert: true}, function(err, doc)
    //   {
    //     if (err) 
    //     {
    //       return res.send(500, {error: err});
    //     }
    //     else
    //     {
    //       //return res.send('Succesfully saved.');
    //       res.redirect('/');
    //     }
    //   });
    // }    

    //******************************************************************************** */
    // if (!name || !lname|| !email || !phone|| !password || !password2) 
    // {
    //     errors.push({ msg: 'Please enter all fields' });
    //     console.log('Fields good');
    // }

    // if (password != password2) {
    //     errors.push({ msg: 'Passwords do not match' });
    // }

    // if (password.length < 8) {
    //     errors.push({ msg: 'Password must be at least 6 characters' });
    // }

    if (errors.length > 0) 
    {
        res.render('register', {
        errors,
        controler_instalDate,
        room_requiredTemp, 
        controler_ip, 
        controler_serverip, 
        controler_syncInt, 
        controler_SN, 
        controler_comment, 
        controler_controledRoom
        });
    }
    else
    {
        console.log('Basic check pass');
        Controler.findOne({ controler_SN: controler_SN }).then(controler => {
        if (controler)
        {
            errors.push({ msg: 'Controler with this SN already exists' });
            res.render('register', {
            errors,
            controler_instalDate,
            room_requiredTemp, 
            controler_ip, 
            controler_serverip, 
            controler_syncInt, 
            controler_SN, 
            controler_comment, 
            controler_controledRoom
            });
        }
        else
        {
            const newControler = new Controler({
            installDate:controler_instalDate,
            desiredTemp:room_requiredTemp, 
            controlerIP:controler_ip, 
            serverIP:controler_serverip, 
            syncInterval:controler_syncInt,  
            coment:controler_comment, 
            assignedRoomID:controler_controledRoom
            
            });            
            newControler
              .save()
              .then(user => {
                // req.flash(
                //   'success_msg_login',
                //   'You are now registered and can log in'
                // );
                res.redirect('/');
              })
              .catch(err => console.log(err));
        }
        });
    }        
});

/*
controler_instalDate
room_requiredTemp
controler_ip
controler_serverip
controler_syncInt
controler_SN
controler_comment
controler_controledRoom


-------

  controler_instalDate: '',
  room_requiredTemp: '',
  controler_ip: '',
  controler_serverip: '',
  controler_syncInt: '',
  controler_SN: '',
  controler_comment: '',
  controler_controledRoom: '' }
*/

module.exports = router; 