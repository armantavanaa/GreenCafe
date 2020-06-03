const express = require("express");
const session = require('express-session');
const router = require('./router');
const app = express();

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


app.listen(3000);
console.log("Server is ready.");
