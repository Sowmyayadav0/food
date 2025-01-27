const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { isGuest } = require("../middlewares/auth");

const router = express.Router();

// Login user
router.get("/login", isGuest, (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;
  res.render("login", { error });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      req.session.error = "Invalid email or password";
      res.redirect("login");
      return;
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.session.error = "Invalid email or password";
      res.redirect("login");
      return;
    }

    // Save user info in session
    req.session.user = { id: user._id, name: user.name, email: user.email };

    res.redirect("/admin");
    return;
  } catch (err) {
    console.error(err);
    req.session.error = "Internal server error";
    res.redirect("login");
  }
});

// Register a new user
router.get("/register", isGuest, (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;
  res.render("register", { error });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.session.error = "Email is already registered";
      res.redirect("register");
      return;
    }

    // Create and save a new user
    const user = new User({ name, email, password });
    await user.save();

    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);

    req.session.error = "Internal server error";
    res.redirect("register");
  }
});

// Logout user
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Unable to log out");
    }
    res.redirect("/");
  });
});

// Default url
router.get("/", isGuest, (_req, res) => {
  res.redirect("/auth/login");
});

module.exports = router;
