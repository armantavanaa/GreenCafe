// Controller for the reservations collection.
const Reservation = require('../models/reservation');
const Menu = require('../models/menu');

// GET /reservations
module.exports.index = function(request, response, next) {

    Menu.find().sort('-date').limit(1)
      .then(function(menus){
        Reservation.find().where('menu').equals(menus[0]._id)
          .then(reservations => response.render(`reservations/index`, {reservations:reservations, menu:menus[0]}))
          .catch(error => next(error));
      })
      .catch(error => next(error));
};

module.exports.create = function(request, response, next) {
  Menu.find().sort('-date').limit(1)
    .then(function(menus){
      request.body.menu = menus[0]._id;
      Reservation.create(request.body)
        .then(reservation => response.status(201).send(reservation.id))
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
