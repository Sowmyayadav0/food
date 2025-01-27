const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// donation page
router.get("/", (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;

  res.render("donate", { error });
});

// thankyou page
router.post("/", async (req, res) => {
  try {
    const { name: donorName, email, amount, message } = req.body;

    // Validate required fields
    if (!donorName || !email || !amount) {
      req.session.error = "Name, email, and amount are required.";
      res.redirect("/donate");
      return;
    }

    // Save donation details
    const donation = new Donation({ donorName, email, amount, message });
    await donation.save();

    // Render thank you page
    res.render("thankyou", { donorName, amount });
  } catch (error) {
    console.error("Error saving donation:", error);
    req.session.error = "An error occurred while processing your donation.";
    res.redirect("/donate");

    return;
  }
});

module.exports = router;
