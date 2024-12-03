const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  rating: { type: Number, default: 0.0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category collection
  image_url: { type: String },
});

module.exports = mongoose.model('Food', foodSchema);
