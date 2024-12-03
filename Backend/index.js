const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

// Replace `<pritp2509>` with your actual MongoDB password.
mongoose.connect("mongodb+srv://pritp300:pritp2509@patel.1a6gz.mongodb.net/?retryWrites=true&w=majority&appName=patel");
const user =require('./models/user');
const review =require('./models/review');
const payment =require('./models/payment');
const orderitem =require('./models/orderitem');
const order =require('./models/order');
const food =require('./models/food');
const cart =require('./models/cart');

//  {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  // .then(() => console.log("Connected to MongoDB"))
  // .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
