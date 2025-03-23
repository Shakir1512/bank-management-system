// DARK MODE TOGGLE
const darkModeToggle = document.getElementById("darkModeToggle");

// Check if dark mode is already enabled
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

// DYNAMIC DATA (Simulated)
const customersCount = document.getElementById("customersCount");
const transactionsCount = document.getElementById("transactionsCount");
const loansCount = document.getElementById("loansCount");

setTimeout(() => {
    customersCount.innerText = "12,500+";
    transactionsCount.innerText = "₹75,00,000+";
    loansCount.innerText = "820+ Approved";
}, 1000);

// SMOOTH SCROLLING
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        if (this.getAttribute("href").startsWith("#")) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});
