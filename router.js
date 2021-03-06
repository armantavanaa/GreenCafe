const express = require('express');
const menus = require('./controllers/menus');
const reservations = require('./controllers/reservations');
const auth = require('../auth.js');


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

router.get('/reservations/mail', authorize,reservations.mail);

router.post('/reservations', reservations.create);

router.delete('/reservations/:id', authorize, reservations.delete);

router.post('/mail/reminder', authorize, reservations.reminder);

router.post('/mail/waitlist', authorize, reservations.waitlist);

router.post('/reservations/checkin/:id', authorize, reservations.checkin);

router.get('/reservations.csv', authorize, reservations.history);

router.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let img = req.files.img;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            img.mv('./public/' + "hp_bg.jpg");

            //send response
            res.redirect('/')
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Export the router
module.exports = router;
