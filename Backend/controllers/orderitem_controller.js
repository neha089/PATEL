const OrderItem = require('../models/orderitem');

// Create Order Item
exports.createOrderItem = async (req, res) => {
  try {
    const orderItem = new OrderItem(req.body);
    await orderItem.save();
    res.status(201).json({ message: 'Order item created successfully', orderItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order Item
exports.getOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id).populate(['order_id', 'food_id']);
    if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Item
exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
    res.json({ message: 'Order item updated successfully', orderItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order Item
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem) return res.status(404).json({ message: 'Order item not found' });
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
