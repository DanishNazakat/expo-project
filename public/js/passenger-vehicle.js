/* VEHICLE CAPACITIES */
const vehicleCapacities = {
    'Bus': 50,
    'Coaster': 20,
    'Hiace': 12
};

/* VEHICLE SELECTION */
const vehicles = document.querySelectorAll(".vehicle");
const summaryVehicle = document.getElementById("summaryVehicle");
const summaryCapacity = document.getElementById("summaryCapacity");

vehicles.forEach(vehicle => {
    vehicle.addEventListener("click", () => {
        vehicles.forEach(v => v.classList.remove("active"));
        vehicle.classList.add("active");
        const selectedVehicle = vehicle.querySelector("h4").textContent;
        summaryVehicle.textContent = selectedVehicle;
        summaryCapacity.textContent = vehicleCapacities[selectedVehicle];
    });
});

/* PASSENGERS */
const passengersInput = document.getElementById("passengersInput");
const summaryPassengers = document.getElementById("summaryPassengers");

passengersInput.addEventListener("input", () => {
    summaryPassengers.textContent = passengersInput.value || 0;
});

/* FARE OFFER */
const fareInput = document.getElementById("fareInput");
const summaryFare = document.getElementById("summaryFare");

fareInput.addEventListener("input", () => {
    summaryFare.textContent = "Rs. " + (fareInput.value || 0);
});

/* MODAL ELEMENTS */
const bookBtn = document.getElementById("bookBtn");
const modal = document.getElementById("bookingModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

/* BOOK NOW FUNCTIONALITY WITH AXIOS */
bookBtn.addEventListener("click", async () => {
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const vehicle = summaryVehicle.textContent;
    const passengers = passengersInput.value || 0;
    const fare = fareInput.value || 0;
    const capacity = summaryCapacity.textContent;

    if(!pickup || !drop || passengers <= 0 || fare <= 0){
        alert("Please fill all fields before booking!");
        return;
    }

    if(passengers > capacity){
        alert(`Maximum capacity for ${vehicle} is ${capacity} passengers!`);
        return;
    }

    // Show modal with "Finding Driver..."
    modal.style.display = "flex";
    modalTitle.textContent = "Finding Driver...";
    modalContent.textContent = "Please wait while we find a driver for your trip.";

    try {
        // Send booking data to backend
        const response = await axios.post("http://localhost:3000/api/passangerVehicalBooking", {
            pickup,
            drop,
            vehicle,
            passengers,
            fare
        });

        // Backend returns booking info
        const booking = response.data;

        // Simulate driver found after 2 sec
        setTimeout(() => {
            modalTitle.textContent = "Driver Found!";
            modalContent.innerHTML = `
                Booking ID: ${booking._id}<br>
                Vehicle: ${booking.vehicle}<br>
                Passengers: ${booking.passengers}<br>
                Fare: Rs. ${booking.fare}<br>
                Pickup: ${booking.pickup}<br>
                Drop: ${booking.drop}<br>
                Driver: Mr. Ali
            `;
        }, 2000);

        // Reset form fields
        passengersInput.value = "";
        fareInput.value = "";
        document.getElementById("pickup").value = "";
        document.getElementById("drop").value = "";
        summaryPassengers.textContent = 0;
        summaryFare.textContent = "Rs. 0";

    } catch (error) {
        console.error(error);
        modalTitle.textContent = "Booking Failed!";
        modalContent.textContent = error.response?.data?.message || "Something went wrong!";
    }
});

// Close modal on button click
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
    if(e.target == modal){
        modal.style.display = "none";
    }
});
