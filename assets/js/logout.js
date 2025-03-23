document.getElementById("logoutBtn").addEventListener("click", function () {
    document.cookie = "loggedInUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    alert("Logged out successfully!");
    window.location.href = "login.html";
});

