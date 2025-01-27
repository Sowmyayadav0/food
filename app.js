const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const { isAuthenticated, isGuest } = require("./middlewares/auth");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session managenment
app.use(
  session({
    secret: "your_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set `secure: true` if using HTTPS
    },
  })
);

// Routes
app.use("/admin/", isAuthenticated, require("./routes/admin"));
app.use("/auth/", require("./routes/auth"));
app.use("/donate/", require("./routes/donation"));
app.use("/old/", require("./routes/old"));
app.use("/", require("./routes/index"));

// Database connection
mongoose
  .connect("mongodb://127.0.0.1/serve-starving", {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
