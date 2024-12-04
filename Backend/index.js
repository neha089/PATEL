const express = require("express");
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

// Replace `<pritp2509>` with your actual MongoDB password.
mongoose.connect("mongodb+srv://neha089:1234@patel.gup50.mongodb.net/?retryWrites=true&w=majority&appName=PATEL");
const user =require('./models/user');
const review =require('./models/review');
const payment =require('./models/payment');
const orderitem =require('./models/orderitem');
const order =require('./models/order');
const food =require('./models/food');
const cart =require('./models/cart');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Import Routes
const userRoutes = require('./routers/users_router');
// const adminRoutes = require('./routes/adminRoutes');
const foodRoutes = require('./routes/feedbackRoutes');
const dataStructureRoutes = require('./routes/dataStructureRoutes');
const noteRoutes = require('./routes/noteRoutes');
const quizRoutes = require('./routes/quizRoutes');
const challengeRoutes = require('./routes/codingChallengeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const questionRoutes = require('./routes/questionRoutes');
const HttpError = require("./models/http-error");

// Use Routes
app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes); // Ensure this is the correct path
app.use('/api/food', foodRoutes);
app.use('/api/datastructures', dataStructureRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/question', questionRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
