const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  order_date: { type: Date, default: Date.now }, // Default to current date
  total_amount: { type: Number, required: true }, // Mongoose uses `Number` for decimals
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], required: true }, // Enum values
  payment_status: { type: String, enum: ['Pending', 'Completed'], required: true },
  payment_method: { type: String, enum: ['Cash On Delivery', 'Online'], required: true },
  delivery_address: { type: String, required: true }, // Use `String` for text fields
});

// Export the schema as a model
module.exports = mongoose.model('Order', orderSchema);
