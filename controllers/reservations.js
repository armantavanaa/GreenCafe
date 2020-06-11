// Controller for the menus collection.
const Reservation = require('../models/reservation');

// GET /reservations
module.exports.index = function(request, response, next) {
  Reservation.find()
    .then(reservations => response.render(`reservations/index`, {reservations:reservations}))
    .catch(error => next(error));
};
