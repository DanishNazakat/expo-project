/* VEHICLE LOADS BASED ON VEHICLE NAME */
const vehicleLoads = {
    'shehzore': 2,    // 2 tons
    'mazda': 5,       // 5 tons
    '22 wheeler': 40  // 40 tons
};

/* VEHICLE SELECTION */
const vehicles = document.querySelectorAll(".vehicle img"); // select images
const summaryVehicle = document.getElementById("summaryVehicle");
const summaryCapacity = document.getElementById("summaryCapacity");

vehicles.forEach(img => {
    img.addEventListener("click", () => {
        // Remove active from all
        document.querySelectorAll(".vehicle").forEach(v => v.classList.remove("active"));
        // Add active to parent div
        img.parentElement.classList.add("active");

        // Get vehicle name from title or alt
        const vehicleName = img.title || img.alt; // fallback to alt if title missing
        const vehicleKey = vehicleName.toLowerCase(); // match with object keys
        summaryVehicle.textContent = vehicleName;

        // Show load in summary
        summaryCapacity.textContent = vehicleLoads[vehicleKey] + " tons";
    });
});

/* LOAD INPUT */
const loadInput = document.getElementById("passengersInput"); // now treat as weight
const summaryLoad = document.getElementById("summaryPassengers");

loadInput.addEventListener("input", () => {
    summaryLoad.textContent = loadInput.value || 0;
});

/* FARE INPUT */
const fareInput = document.getElementById("fareInput");
const summaryFare = document.getElementById("summaryFare");

fareInput.addEventListener("input", () => {
    summaryFare.textContent = "Rs. " + (fareInput.value || 0);
});

/* BOOK NOW FUNCTIONALITY */
const bookBtn = document.getElementById("bookBtn");
const modal = document.getElementById("bookingModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

bookBtn.addEventListener("click", async () => {
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const vehicle = summaryVehicle.textContent;
    const vehicleKey = vehicle.toLowerCase();
    const load = Number(loadInput.value || 0); // weight now
    const fare = Number(fareInput.value || 0);
    const maxLoad = vehicleLoads[vehicleKey];

    if(!pickup || !drop || load <= 0 || fare <= 0){
        alert("Please fill all fields before booking!");
        return;
    }

    if(load > maxLoad){
        alert(`Maximum load for ${vehicle} is ${maxLoad} tons!`);
        return;
    }

    // Show modal while processing
    modal.style.display = "flex";
    modalTitle.textContent = "Booking in Progress...";
    modalContent.textContent = "Please wait while we send your booking request.";

    try {
        // POST request to backend
        const response = await axios.post('http://localhost:3000/api/loadVehicalBooking', {
            pickup,
            drop,
            vehicle,
            load,
            fare
        });

        // Show success in modal
        const booking = response.data.booking;
        modalTitle.textContent = "Booking Confirmed!";
        modalContent.innerHTML = `
            Vehicle: ${booking.vehicle}<br>
            Load: ${booking.load} tons<br>
            Fare: Rs. ${booking.fare}<br>
            Pickup: ${booking.pickup}<br>
            Drop: ${booking.drop}<br>
            Driver: ${booking.driver || "Mr. Ali"}<br>
            Booking ID: ${booking._id || booking.id || "N/A"}
        `;

        console.log("Booking Response:", booking);

    } catch (error) {
        console.error("Booking Error:", error);
        modalTitle.textContent = "Booking Failed!";
        modalContent.textContent = error.response?.data?.message || "Server error. Please try again.";
    }

    // Reset form
    loadInput.value = "";
    fareInput.value = "";
    document.getElementById("pickup").value = "";
    document.getElementById("drop").value = "";
    summaryLoad.textContent = 0;
    summaryFare.textContent = "Rs. 0";
});

// Close modal
closeModal.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => { if(e.target == modal) modal.style.display = "none"; });
