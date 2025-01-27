const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/users_router");

const app = express();
const port = process.env.PORT || 3000;

// Replace `<pritp2509>` with your actual MongoDB password and ensure it is secured.
const mongoUri = "mongodb://localhost:27017";

// Connect to MongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(express.json());

// Use the routes for user-related endpoints
app.use("/users", userRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
