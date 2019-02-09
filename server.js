// Requre dotenv
require('dotenv').config();

// Initialize Libraries
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


// Connect to DB
require('./data/reddit-db');

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Routes
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Server
app.listen(port, () => console.log(`Reddit.js listening on port ${port}!`))

module.exports = app;
