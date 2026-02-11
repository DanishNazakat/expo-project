document.addEventListener("DOMContentLoaded", () => {

    const customerBtn = document.getElementById("customerBtn");
    const driverBtn = document.getElementById("driverBtn");

    // get user data from localStorage (saved after login)
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("User not found, please login first");
        window.location.href = "login.html";
        return;
    }

    // function to save role
    const saveRole = async (role) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/update-role/${user.id}`, { role });
            if (res.data.success) {
                alert(res.data.message);

                // update localStorage
                localStorage.setItem("user", JSON.stringify(res.data.data));

                // redirect based on role
                if (role === "customer") {
                    window.location.href = "./customer-dashboard.html";
                } else {
                    window.location.href = "./driver-dashboard.html";
                }
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    // click events
    customerBtn.addEventListener("click", () => saveRole("customer"));
    driverBtn.addEventListener("click", () => saveRole("driver"));

});
