const express = require("express");
const session = require('express-session');
const router = require('./router');
const connect = require('./db');

connect();

const app = express();

// static files are in public folder
app.use(express.static('public'));

// Configure the views
app.set('view engine', 'ejs');
app.set('views', './views');

// Parse request bodies like query strings
app.use(express.urlencoded({extended: false}));

// Generate a session for each client
app.use(session({
  name: 'catalog', // Name of client cookies
  secret: 'temporary', // Password for client cookies
  resave: false, // Recommended setting
  saveUninitialized: false // Recommended setting
}));

// Log requests to the console
app.use(function(request, response, next) {
  console.log('--------------------------', new Date().toLocaleTimeString());
  console.log(request.method, request.url);
  console.log('Body =', request.body);
  next();
});

// Enter admin mode and return to the previous page
app.get('/login', function(request, response) {
  request.session.admin = true;
  response.redirect('back');
});

// Exit admin mode and return to the previous page
app.get('/logout', function(request, response) {
  request.session.admin = false;
  response.redirect('back');
});

// Make the mode available in all views
app.use(function(request, response, next) {
  response.locals.admin = request.session.admin;
  next();
});
// displaying the home page
app.get('/', function(request, response) {
  response.render('index');
});



// Route content requests
app.use('/', router);

// Handle undefined routes
app.use(function(request, response) {
  console.log('Responded with 404');
  response.status(404).end();
});

// Handle duplicate ID errors
app.use(function(error, request, response, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log('Validation error: Duplicate ID');
    response.status(400).send('Duplicate ID');
  } else {
    next(error);
  }
});

// Handle cast errors
app.use(function(error, request, response, next) {
  if (error.name === 'CastError') {
    console.log('Validation error:', error.message);
    const start = error.message.indexOf('path') + 6;
    const stop = error.message.length - 1;
    const field = error.message.substring(start, stop);
    response.status(400).send(`Invalid ${field}`);
  } else {
    next(error);
  }
});

// Handle validation errors
app.use(function(error, request, response, next) {
  if (error.name === 'ValidationError') {
    const messages = [];
    for (const field in error.errors) {
      console.log('Validation error:', error.errors[field].message);
      messages.push(error.errors[field].message);
    }
    response.status(400).send(messages.join('\n'));
  } else {
    next(error);
  }
});

// Handle other errors
app.use(function(error, request, response) {
  console.error(error.stack);
  response.status(500).send(error.message);
});


app.listen(3000);
console.log("Server is ready.");
