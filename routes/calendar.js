const express = require('express');
const router  = express.Router();

const Event = require('../models/calandar_event.js');

// Login restriction
const User = require('../models/User');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, function(req, res) 
{
    res.render('calendar', { user: req.user });
        
});

// router.get('/', (req,res)=>{
//     res.render('/');
// })

// router.post('/add_events', (req,res)=>{
//     res.render('/');
// })

// router.delete('/delete_event/:id', (req,res)=>{
//     res.render('/');
// })


// /* Fetch all events */
// export const getEvents = async (req, res) => {
//     try {
//         const events = await Event.find();

//         res.status(200).json(events);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// /* Create new event */
// export const createEvent = async (req, res) => {
//     const { title, date } = req.body;

//     const newEvent = new Event({ title, date })

//     try {
//         await newEvent.save();
//         res.status(201).json(
//             {
//                 type: "success",
//                 message: "Event has been added successfully"
//             }
//         );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// /* Delete singile event */
// export const deleteEvent = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

//     await Event.findByIdAndRemove(id);

//     res.json({ message: "Event deleted successfully." });
// }


module.exports = router;