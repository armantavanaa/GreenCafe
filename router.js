const express = require('express');
const menus = require('./controllers/menus');


// Create the router
const router = express.Router();

// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};

router.get('/menus', menus.index);

router.delete('/menus/:id', authorize, menus.delete);


// Export the router
module.exports = router;
