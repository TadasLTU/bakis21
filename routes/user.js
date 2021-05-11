const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

// Login
router.get('/login', (req,res)=>{
    res.render('login');
})

//Login request
router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});

//Register page
router.get('/register', ensureAuthenticated, (req,res)=>{
  res.render('register');
})

//Register request
router.post('/register', ensureAuthenticated, (req, res) => {
  console.log(req.body);
  const { name, lname, email, phone, password, password2, } = req.body;
  let errors = [];
  // console.log('Test');

  if (!name || !lname|| !email || !phone|| !password || !password2) 
  {
    errors.push({ msg: 'Please enter all fields' });
    console.log('Fields good');
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) 
  {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }
  else
  {
    console.log('Basic check pass');
    User.findOne({ email: email }).then(user => {
      if (user)
      {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          lname,
          email,
          phone,
          password,
          password2
        });
      }
      else
      {
        const newUser = new User({
          name,
          lname,
          email,
          phone,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                // req.flash(
                //   'success_msg_login',
                //   'You are now registered and can log in'
                // );
                res.redirect('/user/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


module.exports = router; 