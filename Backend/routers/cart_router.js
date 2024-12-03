const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const cartController = require('../controllers/cart_controller'); // Replace with the actual path to your controller
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

// Add to Cart
router.post(
  '/',
  [
    body('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('Items must be an array with at least one item'),
    body('items.*.food_id').isMongoId().withMessage('Food ID must be a valid MongoDB ID'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be an integer greater than or equal to 1'),
  ],
  validateRequest,
  cartController.addToCart
);

// Get Cart by User ID
router.get(
  '/:user_id',
  [param('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID')],
  validateRequest,
  cartController.getCart
);

// Update Cart
router.put(
  '/:user_id',
  [
    param('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('Items must be an array with at least one item'),
    body('items.*.food_id').isMongoId().withMessage('Food ID must be a valid MongoDB ID'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be an integer greater than or equal to 1'),
  ],
  validateRequest,
  cartController.updateCart
);

// Delete Cart
router.delete(
  '/:user_id',
  [param('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID')],
  validateRequest,
  cartController.deleteCart
);

module.exports = router;
