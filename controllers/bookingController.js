const PassangerVehicalBooking = require('../models/PassnagerVehicalBooking');

// Create new booking
// const createBooking = async (req, res) => {
//     try {
//         const { pickup, drop, vehicle, passengers, fare } = req.body;

//         // Validation
//         if(!pickup || !drop || !vehicle || !passengers || !fare){
//             return res.status(400).json({ success: false, message: 'All fields are required!' });
//         }

//         const vehicleCapacities = { 'Bus': 50, 'Coaster': 20, 'Hiace': 12 };
//         if(passengers > vehicleCapacities[vehicle]){
//             return res.status(400).json({ success: false, message: `Max capacity for ${vehicle} is ${vehicleCapacities[vehicle]}` });
//         }

//         const newBooking = new Booking({ pickup, drop, vehicle, passengers, fare });
//         await newBooking.save();

//         res.json({ success: true, message: 'Booking confirmed!', booking: newBooking });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error!' });
//     }
// };


const passengervehicalBooking = async (req, res) => {
    try {
        const { pickup, drop, vehicle, passengers, fare } = req.body;

        if (!pickup || !drop || !vehicle || !passengers || !fare) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const booking = await PassangerVehicalBooking.create({
            pickup,
            drop,
            vehicle,
            passengers,
            fare
        });

        // Return full booking object
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

module.exports = { passengervehicalBooking, getBookings };
