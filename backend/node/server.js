// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const passport = require("./passportConfig");
const cors = require("cors");

// Load environment variables from .env file
require("dotenv").config();

// Define server port and log directory, with default values
const PORT = process.env.PORT || 3000;
const LOG_DIR = process.env.LOG_DIR || "./logs";

// Create an Express application instance
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize passport for JWT authentication
app.use(passport.initialize());

// Setup rotating log stream for logging HTTP requests
const rotatingLogStream = rfs.createStream("http.log", {
  interval: "1d",
  path: LOG_DIR,
});

// Use morgan middleware for logging
app.use(morgan("combined", { stream: rotatingLogStream }));

// Erlaube CORS für alle Ursprünge (kann eingeschränkt werden)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const collectionRoutes = require("./routes/collection");
const itemRoutes = require("./routes/item");
const stacRoutes = require("./routes/stac");

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", collectionRoutes);
app.use("/api", itemRoutes);
app.use("/stac", stacRoutes);

// Start the server and listen on the defined port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
