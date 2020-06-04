// Controller for the menus collection.
const Menu = require('../models/menu');

// GET /menus
module.exports.index = function(request, response, next) {
  Menu.find()
    .then(menus => response.render(`menus/index`, {menus:menus}))
    .catch(error => next(error));
};
