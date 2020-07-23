// Controller for the menus collection.
const Menu = require('../models/menu');

// GET /menus
module.exports.index = function(request, response, next) {
  Menu.find().sort('-date')
    .then(menus => response.render(`menus/index`, {menus:menus}))
    .catch(error => next(error));
};

module.exports.delete = function(request, response, next) {
  Menu.findByIdAndDelete(request.params.id)
    .then(menu => menu ? response.status(200).end() : next())
    .catch(error => next(error));
};

module.exports.update = function(request, response, next) {
  request.body.dietaries = request.body.dietaries || [];
  Menu.findByIdAndUpdate(request.params.id, request.body)
    .then(menu => menu ? response.status(200).end() : next())
    .catch(error => next(error));
};

module.exports.create = function(request, response, next) {
  request.body.dietaries = request.body.dietaries || [];
  Menu.create(request.body)
    .then(menu => response.status(201).send(menu.id))
    .catch(error => next(error));
};
