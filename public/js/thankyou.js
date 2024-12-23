// Retrieve data from localStorage
document.getElementById("receipt-amount").textContent =
  localStorage.getItem("donationAmount");
document.getElementById("receipt-plate").textContent =
  localStorage.getItem("donationPlate") === "true" ? "Yes" : "No";
document.getElementById("receipt-citizenship").textContent =
  localStorage.getItem("donationCitizenship");
document.getElementById("receipt-name").textContent =
  localStorage.getItem("donationName");
document.getElementById("receipt-email").textContent =
  localStorage.getItem("donationEmail");

// Clear localStorage after displaying receipt
localStorage.clear();
