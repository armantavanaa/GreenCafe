// Controller for the reservations collection.
const Reservation = require('../models/reservation');
const Menu = require('../models/menu');
const mailer = require('./mailer');
const Mail = require('../models/mail');

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

module.exports.mail = function(request, response, next) {

    Menu.find().sort('-date').limit(1)
      .then(function(menus){
        Reservation.find().where('menu').equals(menus[0]._id)
          .then(reservations => response.render(`reservations/mail`, {reservations:reservations, menu:menus[0]}))
          .catch(error => next(error));
      })
      .catch(error => next(error));
};

module.exports.delete = function(request, response, next) {
  Reservation.findByIdAndUpdate(request.params.id, {time:"Canceled"})
    .then(reservation => reservation ? response.status(200).end() : next())
    .catch(error => next(error));
};

module.exports.checkin = function(request, response, next) {
  Reservation.findByIdAndUpdate(request.params.id, {checkin:request.body.checkin})
    .then(reservation => reservation ? response.status(200).end() : next())
    .catch(error => next(error));
};

function email_content(menu, reservation){
  return `Thank you, you have successfully reserved a table on ${menu.date}`;
}

function reminder_content(menu, reservation, note){
  return `Your reservation at ${reservation.time}. ${note}`;
}

module.exports.reminder = function(request, response, next) {
  Menu.find().sort('-date').limit(1)
    .then(function(menus){
      request.body.menu = menus[0]._id;
      Reservation.find().where('menu').equals(menus[0]._id)
        .then(function(reservations){
          for (const reservation of reservations){
            if (reservation.time !== "Waitlist"){
              mailer(reservation.email,"Reminder", reminder_content(menus[0], reservation, request.body.note), function(error, response){
                if (error) {
                  next(error);
                }
              });
            }
          }
        })
        .catch(error => next(error));
      })
      .catch(error => next(error));
};

function waitlist_content(menu, reservation, note){
  return `There is an open spot. ${note}`;
}

module.exports.waitlist = function(request, response, next) {
  Menu.find().sort('-date').limit(1)
    .then(function(menus){
      request.body.menu = menus[0]._id;
      Reservation.find().where('menu').equals(menus[0]._id)
        .then(function(reservations){
          for (const reservation of reservations){
            if (reservation.time === "Waitlist"){
              mailer(reservation.email,"Open Spot", waitlist_content(menus[0], reservation, request.body.note), function(error, response){
                if (error) {
                  next(error);
                }
              });
            }
          }
        })
        .catch(error => next(error));
      })
      .catch(error => next(error));
};

module.exports.create = function(request, response, next) {
  Menu.find().sort('-date').limit(1)
    .then(function(menus){
      request.body.menu = menus[0]._id;
      Reservation.find().where('menu').equals(menus[0]._id).where("time").equals(request.body.time)
        .then(function(rt){
          let reserved = 0;
          for (r of rt){
            if (r.guestName){
              reserved = reserved + 2;
            }else {
              reserved = reserved + 1;
            }
          }
          if (request.body.guestName){
            reserved = reserved + 2;
          }else {
            reserved = reserved + 1;
          }
          if (reserved <= menus[0].capacity){
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
            }else{
              response.status(400).send('Sorry, the time you have chosen is now fully booked.');
            }
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
