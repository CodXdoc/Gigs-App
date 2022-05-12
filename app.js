const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

// Database
const db = require('./config/database');


// Test db Connection
db.authenticate()
    .then(() => console.log('Database connected ...!'))
    .catch(err => console.log('Error: ' + err));

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('INDEX');
});

// Gig Routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});