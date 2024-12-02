const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order model
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }, // Reference to FoodItem model
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Price per item
});

// Export the schema as a model
module.exports = mongoose.model('OrderItem', orderItemSchema);
