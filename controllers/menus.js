// Controller for the menus collection.
const Menu = require('../models/menu');

// GET /menus
module.exports.index = function(request, response, next) {
  Menu.find().sort('date')
    .then(menus => response.render(`menus/index`, {menus:menus}))
    .catch(error => next(error));
};

module.exports.delete = function(request, response, next) {
  Menu.findByIdAndDelete(request.params.id)
    .then(menu => menu ? response.status(200).end() : next())
    .catch(error => next(error));
};
