const loadVehicalBooking = require('../models/loadVehaiclBooking');

// Create a new booking
const loadVehicalBookingfnc = async (req, res) => {
    try {
        const { pickup, drop, vehicle, load, fare } = req.body;

        // Simple validation
        if(!pickup || !drop || !vehicle || !load || !fare){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBooking = await loadVehicalBooking.create({
            pickup,
            drop,
            vehicle,
            load,
            fare,
            driver: "Mr. Ali" // For now static
        });

        return res.status(201).json({ message: "Booking created", booking: newBooking });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Get all bookings
// const getloadBookings = async (req, res) => {
//     try {
//         const bookings = await loadVehicalBooking.find().sort({ createdAt: -1 });
//         return res.status(200).json({ bookings });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error" });
//     }
// };

module.exports =  loadVehicalBookingfnc ;
