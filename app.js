const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Static files
app.use(express.urlencoded({ extended: true })); // Parse form data
app.set('view engine', 'ejs'); // Set EJS as template engine
app.set('views', path.join(__dirname, 'views')); // Templates folder

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// // Database connection (example for MongoDB)
// mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('Database connected'))
//   .catch(err => console.log(err));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
