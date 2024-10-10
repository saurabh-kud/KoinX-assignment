const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fetchCryptoData = require("./backgroundJob/fetchCrypto");
const apiRoutes = require("./routes/api");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

cron.schedule("0 */2 * * *", fetchCryptoData, {
  scheduled: true,
  timezone: "UTC",
});

app.get("/", (req, res) => {
  res.send({
    msg: "server is working fine🚀🚀",
  });
});

app.use("/", apiRoutes);

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Run the background job immediately when the server starts
setTimeout(() => {
  fetchCryptoData();
}, 5000);
// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Closing HTTP server.");
  app.close(() => {
    console.log("HTTP server closed.");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });
});
