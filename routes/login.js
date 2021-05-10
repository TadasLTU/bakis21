// const User = require("../models/user_Schema.js")

const express = require('express');
const router  = express.Router();
//login page
router.get('/', (req,res)=>{
    res.render('login');
})

module.exports = router; 