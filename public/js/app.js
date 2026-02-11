// signup.js

document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signupBtn");

    signupBtn.addEventListener("click", async (e) => {
        e.preventDefault(); // page reload na ho

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!name || !phone || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/", {
                name,
                phone,
                email,
                password
            });

            if(res.data.success){
                // alert(res.data.message);
                // clear form
                document.getElementById("name").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                 window.location.href = "./login.html";
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    });
});
