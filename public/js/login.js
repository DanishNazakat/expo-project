document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/login", { email, password });

            if (res.data.success) {
                const user = res.data.data;

                // ✅ save user to localStorage
                localStorage.setItem("user", JSON.stringify(user));

                // check if role exists
                if (!user.role) {
                    // first time login → redirect to role selection page
                    window.location.href = "role.html";
                } else {
                    // role already set → redirect based on role
                  if (user.role === "customer") {
                    window.location.href = "./customer-dashboard.html";
                } else {
                    window.location.href = "./driver-dashboard.html";
                }
                }
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    });
});
