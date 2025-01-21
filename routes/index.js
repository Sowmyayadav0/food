const express = require("express");
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
  res.render("home", { user: req.session.user || null });
});

// not found page
router.get("*", (_req, res) => {
  res.render("notfound");
});

module.exports = router;
