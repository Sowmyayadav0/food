document.getElementById("submit-btn").addEventListener("click", function () {
  let captcha = document.getElementById("captcha").value;
  if (captcha != "12") {
    alert("Captcha verification failed. Please try again.");
    return;
  }

  // Get form data
  let amount =
    document.querySelector('input[name="amount"]:checked')?.value ||
    document.getElementById("other-amount").value;
  let plate = document.getElementById("plate").checked;
  let citizenship = document.getElementById("citizenship").value;
  let name =
    document.getElementById("title").value +
    " " +
    document.getElementById("name").value;
  let email = document.getElementById("email").value;

  // Save data to localStorage
  localStorage.setItem("donationAmount", amount);
  localStorage.setItem("donationPlate", plate);
  localStorage.setItem("donationCitizenship", citizenship);
  localStorage.setItem("donationName", name);
  localStorage.setItem("donationEmail", email);

  // Redirect to Thank You Page
  window.location.href = "thankyou.html";
});
