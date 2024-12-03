const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String,  required: true},
  description: { type: String },
  price: { type: Number, require:true},
  discount_price:{type:Number,require:true},
  stock_quantity: { type: Number, require: true },
  rating: { type: Number, defaultValue: 0.0 },
  category:{type:String},
  image_url:{type:String}
});

module.exports = mongoose.models.Food || mongoose.model('Food', foodSchema);
