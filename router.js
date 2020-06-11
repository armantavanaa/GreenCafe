const express = require('express');
const menus = require('./controllers/menus');
const reservations = require('./controllers/reservations');


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

router.put('/menus/:id', authorize, menus.update);

router.post('/menus', authorize, menus.create);



router.get('/reservations', reservations.index);

router.post('/reservations', reservations.create);
// Export the router
module.exports = router;
