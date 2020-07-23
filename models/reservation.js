// Model for the reservation collection.
const mongoose = require('mongoose');

// Define the schema
const Reservation = new mongoose.Schema({
    menu:  {type: mongoose.ObjectId, ref: 'Menu'},
    time: String,
    focus: Boolean,
    name: String,
    email: String,
    guestName: String,
    h_chairs: Number,
    allergies: String,
    checkin: Boolean
});

// Export the model
module.exports = mongoose.model('Reservation', Reservation);
