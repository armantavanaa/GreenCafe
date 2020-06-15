// Model for the menu collection.
const mongoose = require('mongoose');

// Define the schema
const Menu = new mongoose.Schema({
    date: Date,
    main: String,
    side: String,
    drink: String,
    salad: String,
    dessert: String,
    note: String
});

// Export the model
module.exports = mongoose.model('Menu', Menu);
