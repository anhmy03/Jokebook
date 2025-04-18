// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const jokeRoutes = require('./routes/jokeRoutes');
const db = require('./models/db-conn'); // if you use this for cleanup

dotenv.config();

const app = express();

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // ✅ serve CSS, JS, images
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/jokebook', jokeRoutes);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

// Cleanup on termination
process.on("SIGINT", cleanUp);

function cleanUp() {
  console.log("Terminate signal received.");
  if (db && db.close) db.close(); // gracefully close database if used
  server.close(() => {
    console.log("...HTTP server closed.");
    process.exit();
  });
}
