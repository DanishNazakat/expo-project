const express = require("express");
const router = express.Router();
const {signup , login}= require("../controllers/Auth");
const updateRole = require("../controllers/updateRole");
const { passengervehicalBooking, getBookings } = require('../controllers/bookingController');
const  loadVehicalBookingfnc = require('../controllers/laodVehicalBooking');
// const  registerVehicle  = require("../controllers/passangerVehical");
// signup
router.post("/", signup);
router.post("/login", login);
router.post('/passangerVehicalBooking', passengervehicalBooking);
router.get('/booking', getBookings);
router.post('/loadVehicalBooking', loadVehicalBookingfnc);
// router.post("/registerPassangerVehical", registerVehicle);
// router.get('/getloadBookings', getloadBookings);
router.put("/update-role/:id", updateRole);

module.exports = router;
