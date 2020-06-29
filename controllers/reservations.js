// Controller for the reservations collection.
const Reservation = require('../models/reservation');
const Menu = require('../models/menu');
const mailer = require('./mailer');

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

module.exports.delete = function(request, response, next) {
  console.log("hello");
  Reservation.findByIdAndDelete(request.params.id)
    .then(reservation => reservation ? response.status(200).end() : next())
    .catch(error => next(error));
};

function email_content(menu, reservation){
  return `Thank you, you have successfully reserved a table on ${menu.date}`;
}

module.exports.create = function(request, response, next) {
  Menu.find().sort('-date').limit(1)
    .then(function(menus){
      request.body.menu = menus[0]._id;
      Reservation.find().where('menu').equals(menus[0]._id).where("time").equals(request.body.time)
        .then(function(rt){
          if (rt.length < menus[0].capacity){
            Reservation.create(request.body)
              .then(function(reservation){
                 response.status(201).send(reservation.id);
                 mailer(reservation.email, "Your Reservation", email_content(menus[0], reservation), function(error, response){
                   if (error) {
                     next(error);
                   }
                });
              })
              .catch(error => next(error));
            };
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
