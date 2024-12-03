const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const orderItemController = require('../controllers/orderitem_controller'); // Replace with the actual path to your controller
const { validationResult } = require('express-validator'); // Import validation result

// Helper function to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CRUD Routes

// Create OrderItem
router.post(
  '/',
  [
    body('order_id').isMongoId().withMessage('Order ID must be a valid MongoDB ID'),
    body('food_id').isMongoId().withMessage('Food ID must be a valid MongoDB ID'),
    body('quantity')
      .isInt({ gt: 0 })
      .withMessage('Quantity must be a positive integer'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),
  ],
  validateRequest,
  orderItemController.createOrderItem
);

// Get OrderItem by ID
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  orderItemController.getOrderItem
);

// Update OrderItem
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('quantity')
      .isInt({ gt: 0 })
      .optional()
      .withMessage('Quantity must be a positive integer'),
    body('price')
      .isFloat({ gt: 0 })
      .optional()
      .withMessage('Price must be a positive number'),
  ],
  validateRequest,
  orderItemController.updateOrderItem
);

// Delete OrderItem
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  orderItemController.deleteOrderItem
);

module.exports = router;
