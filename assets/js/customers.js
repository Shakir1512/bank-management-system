document.addEventListener("DOMContentLoaded", function () {
    loadCustomers();
});

// Open Modal
function openModal(edit = false, index = null) {
    const modal = document.getElementById("customerModal");
    modal.style.display = "block";

    if (edit) {
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customer = customers[index];

        document.getElementById("customerId").value = index;
        document.getElementById("customerName").value = customer.name;
        document.getElementById("customerEmail").value = customer.email;
        document.getElementById("customerPhone").value = customer.phone;
        document.getElementById("customerBalance").value = customer.balance;
        document.getElementById("modalTitle").textContent = "Edit Customer";
    } else {
        document.getElementById("customerId").value = "";
        document.getElementById("customerName").value = "";
        document.getElementById("customerEmail").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("customerBalance").value = "";
        document.getElementById("modalTitle").textContent = "Add Customer";
    }
}

// Close Modal
function closeModal() {
    document.getElementById("customerModal").style.display = "none";
}

// Save Customer (Add or Edit)
function saveCustomer() {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    const id = document.getElementById("customerId").value;
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const phone = document.getElementById("customerPhone").value;
    const balance = document.getElementById("customerBalance").value;

    if (!name || !email || !phone || !balance) {
        alert("All fields are required!");
        return;
    }

    const customerData = { name, email, phone, balance };

    if (id === "") {
        customers.push(customerData); // Add new customer
    } else {
        customers[id] = customerData; // Edit existing customer
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    loadCustomers();
    closeModal();
}

// Load Customers to Table
function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const tableBody = document.getElementById("customerList");
    tableBody.innerHTML = "";

    customers.forEach((customer, index) => {
        const row = `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>$${customer.balance}</td>
                <td>
                    <button class="edit-btn" onclick="openModal(true, ${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteCustomer(${index})">🗑️</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Delete Customer
function deleteCustomer(index) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    loadCustomers();
}
