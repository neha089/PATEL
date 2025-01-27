const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Replace `<pritp2509>` with your actual MongoDB password and ensure it is secured.
const mongoUri = "mongodb+srv://pritp300:pritp2509@patel.1a6gz.mongodb.net/patel?retryWrites=true&w=majority";

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

// Import Models
const User = require('./models/user');
const Review = require('./models/review');
const Payment = require('./models/payment');
const OrderItem = require('./models/orderitem');
const Order = require('./models/order');
const Food = require('./models/food');
const Cart = require('./models/cart');

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
