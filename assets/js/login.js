document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Redirect if already logged in
    if (getCookie("loggedInUser")) {
        window.location.href = "dashboard.html";
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Simulated users in localStorage (or replace with backend API call)
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store user info in a cookie
            document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(user))}; path=/;`;
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid email or password");
        }
    });
});

// Function to get cookie value
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}
