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
        if (!customer.accountNumber) {
            customer.accountNumber = `AC-${1000 + index}`;
        }

        let option = `<option value="${index}" data-account="${customer.accountNumber}">
                        ${customer.accountNumber} - ${customer.name} (₹${customer.balance})
                      </option>`;

        customerSelect.innerHTML += option;
        recipientSelect.innerHTML += option;
    });

    localStorage.setItem("customers", JSON.stringify(customers));
}

// Show/Hide Transfer Section
document.getElementById("transactionType").addEventListener("change", function () {
    let transferSection = document.getElementById("transferSection");
    transferSection.style.display = (this.value === "transfer") ? "block" : "none";
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
    customer.balance = parseFloat(customer.balance); // Fix: Convert balance to number

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    if (type === "deposit") {
        customer.balance += amount;
        transactions.push({
            customer: `${customer.accountNumber} - ${customer.name}`,
            type: "Deposit",
            amount,
            date: new Date().toLocaleString()
        });
    } else if (type === "withdraw") {
        if (customer.balance - amount < 500) {
            alert("Minimum balance should be ₹500 after withdrawal!");
            return;
        }
        customer.balance -= amount;
        transactions.push({
            customer: `${customer.accountNumber} - ${customer.name}`,
            type: "Withdrawal",
            amount,
            date: new Date().toLocaleString()
        });
    } else if (type === "transfer") {
        let recipientIndex = document.getElementById("recipientSelect").value;
        if (recipientIndex === "" || recipientIndex == customerIndex) {
            alert("Invalid Recipient!");
            return;
        }

        let recipient = customers[recipientIndex];
        recipient.balance = parseFloat(recipient.balance); // Fix: Convert balance to number

        if (!recipient || !recipient.accountNumber) {
            alert("Recipient not found!");
            return;
        }

        if (customer.balance - amount < 500) {
            alert("Minimum balance should be ₹500 after transfer!");
            return;
        }

        // Perform transfer
        customer.balance -= amount;
        recipient.balance += amount;

        // Save Transfer transaction (Fix: Avoid duplicates)
        transactions.push({
            from: `${customer.accountNumber} - ${customer.name}`,
            to: `${recipient.accountNumber} - ${recipient.name}`,
            type: "Transfer",
            amount,
            date: new Date().toLocaleString()
        });
    }

    // Save updated customers
    localStorage.setItem("customers", JSON.stringify(customers));

    // Save updated transactions
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Reset Inputs
    document.getElementById("amount").value = "";
    document.getElementById("customerSelect").selectedIndex = 0;
    document.getElementById("recipientSelect").selectedIndex = 0;
    document.getElementById("transactionType").selectedIndex = 0;
    document.getElementById("transferSection").style.display = "none";

    // Refresh UI
    loadTransactions();
    loadCustomersForTransactions();
}

// Load Transactions to Table
function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let tableBody = document.getElementById("transactionList");
    tableBody.innerHTML = "";

    transactions.forEach(transaction => {
        let row = `
            <tr>
                <td>${transaction.from ? transaction.from : transaction.customer}</td>
                <td>${transaction.type}${transaction.to ? ` (To: ${transaction.to})` : ""}</td>
                <td>₹${transaction.amount}</td>
                <td>${transaction.date}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
