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

// Handlebars
app.engine('handlebars', exphbs.engine({
    extname: 'handlebars',
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

// Index Route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig Routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});