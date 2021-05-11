var express = require('express');
var router = express.Router();
const Room = require('../models/room');

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
    // console.log('Test');
    // res.render('dataOveview', {data:Room});  
    // console.log(Room.find());
    Room.find({}, function (err, allRooms) 
    {
        if (err) 
        {
            console.log(err);
        } 
        else 
        {
            res.render("dataOveview", { data: allRooms })
            console.log(allRooms);
        }
    });
});

router.get('/add', ensureAuthenticated, function(req, res) 
{
    res.render('addRoom');
        
});

router.post('/add', ensureAuthenticated, function(req, res) 
{
    console.log(req.body);
    const { roomNumber, roomCname, roomInfo } = req.body;
    let errors = [];  

    if (errors.length > 0) 
    {
      res.render('add', {
        errors,
        roomNumber,
        roomCname,
        roomInfo
      });
    }
    else
    {
      console.log('Basic check pass');
      Room.findOne({ roomNumber: roomNumber }).then(room => {
        if (room)
        {
          errors.push({ msg: 'Room number already exists' });
          res.render('add', {
            errors,
            roomNumber,
            roomCname,
            roomInfo
          });
        }
        else
        {
          const newRoom = new Room({
            roomNumber,
            roomCname,
            roomInfo
          });

          newRoom
            .save()
            .then(room  => {
                req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                );
                res.redirect('/');
            }).catch(err => console.log(err));
        }
      });
    }
        
});

module.exports = router;

