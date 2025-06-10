// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const DBURI = process.env.DBURI;

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DBURI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Export the connection function
module.exports = connectToDatabase;
