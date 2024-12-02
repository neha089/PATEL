const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true }, // Reference to FoodItem model
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating from 1 to 5
  review_text: { type: String, required: false }, // Optional review text
  review_date: { type: Date, default: Date.now }, // Default to current date
});

// Export the schema as a model
module.exports = mongoose.model('Review', reviewSchema);
