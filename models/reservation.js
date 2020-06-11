// Model for the reservation collection.
const mongoose = require('mongoose');

// Define the schema
const Reservation = new mongoose.Schema({
    menu: mongoose.ObjectId,
    name: String,
    email: String,
    guests: Number,
    h_chairs: Number,
    allergies: String
});

// Export the model
module.exports = mongoose.model('Reservation', Reservation);
