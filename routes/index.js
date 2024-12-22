const express = require("express");
const router = express.Router();

// Home Route
router.get("/", (_req, res) => {
  res.render("index");
});

// Donate Route
router.get("/donate", (_req, res) => {
  res.render("sample");
});

// Thankyou Route
router.get("/thankyou", (_req, res) => {
  res.render("thankyou");
});

module.exports = router;
