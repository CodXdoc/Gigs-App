const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


/// Get gig list
router.get('/', (req, res) =>
    Gig.findAll({ raw: true })
    .then(gigs => res.render('gigs', {
        gigs
    }))
    .catch(err => res.render('error', { error: err })));

// display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a Gig
router.post('/add', (req, res) => {
    let { title, technologies, description, budget, contact_email } = req.body;

    let errors = [];

    // Validate Fields
    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!technologies) {
        errors.push({ text: 'Please add some technologies' });
    }
    if (!description) {
        errors.push({ text: 'Please add a description' });
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a contact email' });
    }


    // Check for Errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            description,
            budget,
            contact_email
        })
    } else {

        if (!budget) {
            budget = 'Unkown';
        } else {
            budget = `$${budget}`
        }

        // Trimm and lowercase
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // INSERT INTO TABLE
        Gig.create({
                title,
                technologies,
                description,
                budget,
                contact_email
            })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }

});

// Search for gigs
router.get('/search', (req, res) => {
    const { term } = req.query;
    Gig.findAll({ raw: true }, {
            where: {
                technologies: {
                    [Op.like]: '%' + term + '%'
                }
            }
        })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
})

module.exports = router;