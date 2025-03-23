document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let fullname = document.getElementById("fullname").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let existingUser = users.find(user => user.email === email);
            if (existingUser) {
                alert("User already exists with this email!");
                return;
            }

            users.push({ fullname, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                document.cookie = `loggedInUser=${email}; path=/; max-age=86400`; // 1-day session
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password!");
            }
        });
    }
});
