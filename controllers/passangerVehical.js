// // controllers/vehicleController.js
// const passengerVehicle = require("../models/passangerVehical");

// const registerVehicle = async (req, res) => {
//     try {
//         const {
//             vehicleName,
//             model,
//             capacity,
//             color,
//             vehicleNumber
//         } = req.body;

//         // validation
//         if (!vehicleName || !model || !capacity || !color || !vehicleNumber) {
//             return res.status(400).json({
//                 message: "All fields are required"
//             });
//         }

//         // duplicate check
//         const alreadyExists = await passengerVehicle.findOne({ vehicleNumber });
//         if (alreadyExists) {
//             return res.status(409).json({
//                 message: "Vehicle already registered"
//             });
//         }

//         const vehicle = await passengerVehicle.create({
//             vehicleName,
//             model,
//             capacity,
//             color,
//             vehicleNumber
//         });

//         return res.status(201).json({
//             message: "Vehicle registered successfully",
//             vehicle
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error", 
//             error: error.message
//         });
//     }
// };

// module.exports = { registerVehicle };
