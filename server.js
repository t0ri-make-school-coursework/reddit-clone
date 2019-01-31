// Initialize Libraries
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars');

// Connect to DB

// Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    res.render('index')
});

// Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
