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

app.get('/', (req, res) => {
    res.render('posts-new')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

// Server
app.listen(port, () => console.log(`Reddit.js listening on port ${port}!`))
