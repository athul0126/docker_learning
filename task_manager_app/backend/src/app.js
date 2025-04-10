const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

// Enable CORS for all origins (great for development)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Server & DB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Retry logic for MongoDB connection
const connectWithRetry = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("✅ Connected to MongoDB");
      app.listen(PORT, () =>
        console.log(`🚀 Server running on port ${PORT}`)
      );
      break;
    } catch (err) {
      console.error(
        `❌ MongoDB connection error: ${err.message}. Retrying in ${delay / 1000}s...`
      );
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  if (!retries) {
    console.error("❌ Could not connect to MongoDB. Exiting...");
    process.exit(1);
  }
};

connectWithRetry();
