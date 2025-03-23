document.addEventListener("DOMContentLoaded", function () {
    loadCustomersForTransactions();
    loadTransactions();
});

// Load customers into dropdowns
function loadCustomersForTransactions() {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let customerSelect = document.getElementById("customerSelect");
    let recipientSelect = document.getElementById("recipientSelect");

    customerSelect.innerHTML = "<option value=''>Select Customer</option>";
    recipientSelect.innerHTML = "<option value=''>Select Recipient</option>";

    customers.forEach((customer, index) => {
        let option = `<option value="${index}">${customer.name} - ${customer.balance}</option>`;
        customerSelect.innerHTML += option;
        recipientSelect.innerHTML += option;
    });
}

// Show/Hide Transfer Section
document.getElementById("transactionType").addEventListener("change", function () {
    let transferSection = document.getElementById("transferSection");
    if (this.value === "transfer") {
        transferSection.style.display = "block";
    } else {
        transferSection.style.display = "none";
    }
});

// Process Transactions
function processTransaction() {
    let type = document.getElementById("transactionType").value;
    let customerIndex = document.getElementById("customerSelect").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    if (customerIndex === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    let customer = customers[customerIndex];

    if (type === "deposit") {
        customer.balance = parseFloat(customer.balance) + amount;
    } else if (type === "withdraw") {
        if (customer.balance < amount) {
            alert("Insufficient Balance!");
            return;
        }
        customer.balance = parseFloat(customer.balance) - amount;
    } else if (type === "transfer") {
        let recipientIndex = document.getElementById("recipientSelect").value;
        if (recipientIndex === "" || recipientIndex == customerIndex) {
            alert("Invalid Recipient!");
            return;
        }

        let recipient = customers[recipientIndex];
        if (customer.balance < amount) {
            alert("Insufficient Balance!");
            return;
        }

        customer.balance = parseFloat(customer.balance) - amount;
        recipient.balance = parseFloat(recipient.balance) + amount;
    }

    // Save Updated Customers
    localStorage.setItem("customers", JSON.stringify(customers));

    // Save Transaction History
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
        customer: customer.name,
        type,
        amount,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadTransactions();
    loadCustomersForTransactions(); // Update dropdown balances
}

// Load Transactions to Table
function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let tableBody = document.getElementById("transactionList");
    tableBody.innerHTML = "";

    transactions.forEach(transaction => {
        let row = `
            <tr>
                <td>${transaction.customer}</td>
                <td>${transaction.type}</td>
                <td>$${transaction.amount}</td>
                <td>${transaction.date}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
