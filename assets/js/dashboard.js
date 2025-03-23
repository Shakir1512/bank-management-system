document.addEventListener("DOMContentLoaded", function () {
    // Get logged-in user from cookies
    const loggedInUser = getCookie("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }

    try {
        const user = JSON.parse(loggedInUser);
        document.getElementById("userEmail").textContent = user.email;
    } catch (error) {
        console.error("Error parsing logged-in user data:", error);
        document.getElementById("userEmail").textContent = "Unknown User";
    }

    // Fetch and display dashboard stats
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let loans = JSON.parse(localStorage.getItem("loans")) || [];

    document.getElementById("totalCustomers").textContent = customers.length;
    document.getElementById("totalTransactions").textContent = transactions.length;
    document.getElementById("totalLoans").textContent = loans.length;

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "login.html";
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
