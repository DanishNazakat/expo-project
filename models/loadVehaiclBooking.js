const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    vehicle: { type: String, required: true },
    load: { type: Number, required: true },      // in tons
    fare: { type: Number, required: true },
    driver: { type: String, default: "Driver not assigned" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('loadVehicalBooking', bookingSchema);
