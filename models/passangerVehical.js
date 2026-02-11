const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        enum: ["Hiroof", "Hiace", "Bus"],
        required: true
    },
    model: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("passengerVehicle", vehicleSchema);
