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
    res.render('index', { user: req.user });
        
});

router.get('/edit', ensureAuthenticated, function(req, res) 
{
  Room.find({}, function (err, allRooms) 
  {
      if (err) 
      {
          console.log(err);
      } 
      else 
      {
          res.render("roomData_edit", { data: allRooms })
          console.log(allRooms);
      }
  });
        
});

router.get('/edit/:ID', ensureAuthenticated, function(req, res) 
{
  var selectedRoom = req.params.ID;
  console.log(selectedRoom);
  
  Room.find({ _id: selectedRoom }, function (err, selectedRoom) 
  {
      if (err) 
      {
          console.log(err);
      } 
      else 
      {
          res.render("roomData_Edit_spec", { data: selectedRoom })
          console.log(selectedRoom);
      }
  });
        
});

router.post('/edit/:ID', ensureAuthenticated, function(req, res) 
{
  var selectedRoom = req.params.ID;
  console.log(selectedRoom);
  
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
      Room.findOneAndUpdate({_id:selectedRoom}, 
        {
          roomNumber:roomNumber,
          roomCname:roomCname,
          roomInfo:roomInfo
        }, {upsert: true}, function(err, doc)
      {
        if (err) 
        {
          return res.send(500, {error: err});
        }
        else
        {
          //return res.send('Succesfully saved.');
          res.redirect('/roomData/edit');
        }
      });
    }    
        
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

router.get('/show/RoomDetails/:ID', ensureAuthenticated, function(req, res) 
{
    // console.log('Test');
    // res.render('dataOveview', {data:Room});  
    // console.log(Room.find());
    // Room.find({}, function (err, allRooms) 
    // {
    //     if (err) 
    //     {
    //         console.log(err);
    //     } 
    //     else 
    //     {
    //         res.render("dataOveview", { data: allRooms })
    //         console.log(allRooms);
    //     }
    // });

    res.render('index', { user: req.user });
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

