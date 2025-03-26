document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Redirect if already logged in
    if (getCookie("loggedInUser")) {
        window.location.href = "dashboard.html";  // Redirect to Home Page
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const ssnId = document.getElementById("ssnId").value;
        const password = document.getElementById("password").value;

        // Get users from local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.ssnId === ssnId && u.password === password);

        if (user) {
            // Store user session in cookie
            document.cookie = `loggedInUser=${encodeURIComponent(JSON.stringify(user))}; path=/;`;

            // Show success popup
            showSuccessPopup("Customer Registration Successful", () => {
                window.location.href = "dashboard.html"; // Redirect after closing popup
            });
        } else {
            alert("Invalid SSN ID or Password");
        }
    });
});

// Function to show success popup
function showSuccessPopup(message, callback) {
    // Create popup container
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#d4edda"; // Light green background
    popup.style.color = "#155724"; // Dark green text
    popup.style.padding = "20px";
    popup.style.border = "1px solid #c3e6cb";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.1)";
    popup.style.textAlign = "center";
    popup.style.zIndex = "1000";

    // Create message text
    const messageText = document.createElement("p");
    messageText.textContent = message;
    messageText.style.fontSize = "16px";
    messageText.style.fontWeight = "bold";

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "OK";
    closeButton.style.marginTop = "10px";
    closeButton.style.padding = "8px 16px";
    closeButton.style.backgroundColor = "#155724"; // Dark green
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "3px";
    closeButton.style.cursor = "pointer";

    // Close popup and execute callback on click
    closeButton.addEventListener("click", function () {
        document.body.removeChild(popup);
        if (callback) callback();
    });

    // Append elements to popup
    popup.appendChild(messageText);
    popup.appendChild(closeButton);

    // Append popup to body
    document.body.appendChild(popup);
}

// Function to get cookie value
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}
