// Model for the apartment collection.
const mongoose = require('mongoose');

// Define the schema
const Menu = new mongoose.Schema({
    date: Date,
    main: String,
    side: String,
    drink: String,
    salad: String,
    dessert: String
});

// Export the model
module.exports = mongoose.model('Menu', Menu);
