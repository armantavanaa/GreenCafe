// Model for the menu collection.
const mongoose = require('mongoose');

// Define the schema
const Mail = new mongoose.Schema({
    menu: mongoose.ObjectId,
    name: String,
    date: Date,
    type: String,
    note: String
});

// Export the model
module.exports = mongoose.model('Mail', Mail);
