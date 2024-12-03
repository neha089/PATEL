const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to Order model
  payment_method: { type: String, enum: ['Cash On Delivery', 'Online'], required: true }, // Payment methods
  payment_status: { type: String, enum: ['Pending', 'Completed'], required: true }, // Payment status
  transaction_id: { type: String, unique: true, sparse: true },
  payment_date: { type: Date, default: Date.now }, // Default to current date
  amount_paid: { type: Number, required: true }, // Amount paid
});

// Export the schema as a model
module.exports = mongoose.model('Payment', paymentSchema);
