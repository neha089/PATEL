
const Cart = require('../models/cart');
const Food = require('../models/food'); // Assuming food model is required for checking food availability

// Create Cart
exports.createCart = async (req, res) => {
  try {
    const cart = new Cart({ user_id: req.body.user_id, items: [] });
    await cart.save();
    res.status(201).json({ message: 'Cart created successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Item to Cart
exports.addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const { food_id, quantity } = req.body;
    const foodItem = await Food.findById(food_id);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

    const existingItem = cart.items.find(item => item.food_id.toString() === food_id);
    if (existingItem) {
      // Update the quantity if the item already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ food_id, quantity });
    }

    cart.updated_at = Date.now();
    await cart.save();
    res.json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Item Quantity in Cart
exports.updateItemQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const { food_id, quantity } = req.body;
    const foodItem = await Food.findById(food_id);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

    const existingItem = cart.items.find(item => item.food_id.toString() === food_id);
    if (!existingItem) return res.status(404).json({ message: 'Item not found in cart' });

    existingItem.quantity = quantity;
    cart.updated_at = Date.now();
    await cart.save();
    res.json({ message: 'Item quantity updated successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const { food_id } = req.body;
    const foodItem = await Food.findById(food_id);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

    cart.items = cart.items.filter(item => item.food_id.toString() !== food_id);
    cart.updated_at = Date.now();
    await cart.save();
    res.json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart by User ID
exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.user_id }).populate('items.food_id');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.body.user_id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    cart.updated_at = Date.now();
    await cart.save();
    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
