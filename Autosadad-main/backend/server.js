const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route imports
const userRoutes = require("./routes/userRoutes");
const billRoutes = require("./routes/billRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const autoPayRoutes = require("./routes/autoPayRoutes");
const paymentIntegrationRoutes = require("./routes/paymentIntegrationRoutes");

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/reminders", reminderRoutes);              // 👈 REMINDERS
app.use("/api/auto-pay-rules", autoPayRoutes);
app.use("/api/payment-integration", paymentIntegrationRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Auto Sadad API is running (Milestone 1)" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});