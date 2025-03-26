document.addEventListener("DOMContentLoaded", function () {
    loadCustomers();
});

// Function to show success popups
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}

// Open Modal for Adding or Editing Customer
function openModal(edit = false, index = null) {
    const modal = document.getElementById("customerModal");
    modal.style.display = "block";

    if (edit) {
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const customer = customers[index];

        document.getElementById("customerId").value = index;
        document.getElementById("ssnId").value = customer.ssnId;
        document.getElementById("customerName").value = customer.name;
        document.getElementById("accountNumber").value = customer.accountNumber;
        document.getElementById("ifscCode").value = customer.ifscCode;
        document.getElementById("accountBalance").value = customer.balance;
        document.getElementById("aadhaar").value = customer.aadhaar;
        document.getElementById("panCard").value = customer.panCard;
        document.getElementById("dob").value = customer.dob;
        document.getElementById("gender").value = customer.gender;
        document.getElementById("maritalStatus").value = customer.maritalStatus;
        document.getElementById("customerEmail").value = customer.email;
        document.getElementById("address").value = customer.address;
        document.getElementById("customerPhone").value = customer.phone;

        document.getElementById("modalTitle").textContent = "Edit Customer";
    } else {
        document.getElementById("customerId").value = "";
        document.getElementById("ssnId").value = "";
        document.getElementById("customerName").value = "";
        document.getElementById("accountNumber").value = "";
        document.getElementById("ifscCode").value = "";
        document.getElementById("accountBalance").value = "";
        document.getElementById("aadhaar").value = "";
        document.getElementById("panCard").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("maritalStatus").value = "";
        document.getElementById("customerEmail").value = "";
        document.getElementById("address").value = "";
        document.getElementById("customerPhone").value = "";

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

    const customerData = {
        ssnId: document.getElementById("ssnId").value.trim(),
        name: document.getElementById("customerName").value.trim(),
        accountNumber: document.getElementById("accountNumber").value.trim(),
        ifscCode: document.getElementById("ifscCode").value.trim(),
        balance: document.getElementById("accountBalance").value.trim(),
        aadhaar: document.getElementById("aadhaar").value.trim(),
        panCard: document.getElementById("panCard").value.trim(),
        dob: document.getElementById("dob").value.trim(),
        gender: document.getElementById("gender").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        email: document.getElementById("customerEmail").value.trim(),
        address: document.getElementById("address").value.trim(),
        phone: document.getElementById("customerPhone").value.trim(),
    };

    if (Object.values(customerData).some(value => value === "")) {
        alert("All fields are required!");
        return;
    }

    // Duplicate check for SSN ID and Account Number
    if (customers.some(c => (c.ssnId === customerData.ssnId || c.accountNumber === customerData.accountNumber) && customers.indexOf(c) !== parseInt(id))) {
        alert("Customer with this SSN ID or Account Number already exists!");
        return;
    }

    if (id === "") {
        customers.push(customerData); // Add new customer
        showPopup("Customer Registration Successful ✅");
    } else {
        customers[id] = customerData; // Edit existing customer
        showPopup("Customer Updated Successfully ✏️");
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    loadCustomers();
    closeModal();
}

// Load Customers to Table
function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const tableBody = document.getElementById("customerList");
    tableBody.innerHTML = customers.map((customer, index) => `
        <tr>
            <td>${customer.ssnId}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>$${customer.balance}</td>
            <td>
                <button class="edit-btn" onclick="openModal(true, ${index})">✏️</button>
                <button class="delete-btn" onclick="deleteCustomer(${index})">🗑️</button>
            </td>
        </tr>
    `).join("");
}

// Delete Customer
function deleteCustomer(index) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Confirm before deletion
    const confirmDelete = confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    loadCustomers();
    showPopup("Customer Deleted Successfully ❌");
}
