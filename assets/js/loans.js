document.addEventListener("DOMContentLoaded", function () {
    loadCustomersForLoans();
    loadLoanRequests();
});

// Load customers into dropdown
function loadCustomersForLoans() {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let customerSelect = document.getElementById("customerSelect");

    customerSelect.innerHTML = "<option value=''>Select Customer</option>";

    customers.forEach((customer, index) => {
        let option = `<option value="${index}">${customer.name}</option>`;
        customerSelect.innerHTML += option;
    });
}

// Request Loan
function requestLoan() {
    let customerIndex = document.getElementById("customerSelect").value;
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    if (customerIndex === "" || isNaN(loanAmount) || loanAmount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    let customer = customers[customerIndex];

    let loanRequest = {
        customer: customer.name,
        amount: loanAmount,
        status: "Pending",
        customerIndex
    };

    // Save Loan Request
    let loanRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
    loanRequests.push(loanRequest);
    localStorage.setItem("loanRequests", JSON.stringify(loanRequests));

    loadLoanRequests();  // Update loan requests list
}

// Load Loan Requests to Table
function loadLoanRequests() {
    let loanRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
    let tableBody = document.getElementById("loanRequestsList");
    tableBody.innerHTML = "";

    loanRequests.forEach((loanRequest, index) => {
        let row = `
            <tr>
                <td>${loanRequest.customer}</td>
                <td>$${loanRequest.amount}</td>
                <td>${loanRequest.status}</td>
                <td>
                    <button onclick="approveLoan(${index})" ${loanRequest.status === 'Approved' || loanRequest.status === 'Rejected' ? 'disabled' : ''}>Approve</button>
                    <button onclick="rejectLoan(${index})" ${loanRequest.status === 'Approved' || loanRequest.status === 'Rejected' ? 'disabled' : ''}>Reject</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Approve Loan
function approveLoan(index) {
    let loanRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
    loanRequests[index].status = "Approved";
    localStorage.setItem("loanRequests", JSON.stringify(loanRequests));
    loadLoanRequests();
}

// Reject Loan
function rejectLoan(index) {
    let loanRequests = JSON.parse(localStorage.getItem("loanRequests")) || [];
    loanRequests[index].status = "Rejected";
    localStorage.setItem("loanRequests", JSON.stringify(loanRequests));
    loadLoanRequests();
}
