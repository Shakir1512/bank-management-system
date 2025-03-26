document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let ssnId = document.getElementById("ssnId").value;
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let address = document.getElementById("address").value;
            let contactNumber = document.getElementById("contactNumber").value;

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

            let customerId = "CUST" + Math.floor(100000 + Math.random() * 900000); // Generate random Customer ID

            let newUser = {
                customerId,
                ssnId,
                firstName,
                lastName,
                email,
                password,
                address,
                contactNumber
            };

            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Store user session in cookie
            document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(newUser))}; path=/;`;

            // Show acknowledgment screen
            showAcknowledgment(customerId, firstName, email);
        });
    }
});

// Function to display acknowledgment screen
function showAcknowledgment(customerId, name, email) {
    document.body.innerHTML = `
        <div class="auth-container">
            <h2 style="color: green;">Customer Registration Successful</h2>
            <p><strong>Customer ID:</strong> ${customerId}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <a href="login.html">Proceed to Login</a>
        </div>
    `;
}
