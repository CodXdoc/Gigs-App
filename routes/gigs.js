const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');


// Get Gig List
router.get('/', async(req, res) => {
    try {
        const gigs = await Gig.findAll();
        res.render('gigs', {
            gigs
        });
    } catch (err) {
        console.log(err)
    }

});

// display add gig form
router.get('/add', (req, res) => res.render('add'))


// Add a Gig

module.exports = router;