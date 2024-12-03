const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  items: [
    {
      food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }, // Reference to Food model
      quantity: { type: Number, required: true, min: 1 }, // Quantity of the food item
    },
  ],
  created_at: { type: Date, default: Date.now }, // Timestamp when the cart was created
  updated_at: { type: Date, default: Date.now }, // Timestamp when the cart was last updated
});

// Middleware to update the `updated_at` field before saving
cartSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Export the schema as a model
module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
