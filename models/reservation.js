// Model for the reservation collection.
const mongoose = require('mongoose');

// Define the schema
const Reservation = new mongoose.Schema({
    menu: mongoose.ObjectId,
    time: String,
    name: String,
    email: String,
    guestName: String,
    h_chairs: Number,
    allergies: String
});

// Export the model
module.exports = mongoose.model('Reservation', Reservation);
