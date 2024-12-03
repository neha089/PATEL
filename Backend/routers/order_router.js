const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const orderController = require('../controllers/order_controller'); // Replace with actual path to your controller
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

// Create Order
router.post(
  '/',
  [
    body('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    body('total_amount')
      .isFloat({ gt: 0 })
      .withMessage('Total amount must be a positive number'),
    body('status')
      .isIn(['Pending', 'Completed', 'Cancelled'])
      .withMessage('Status must be one of Pending, Completed, or Cancelled'),
    body('payment_status')
      .isIn(['Pending', 'Completed'])
      .withMessage('Payment status must be one of Pending or Completed'),
    body('payment_method')
      .isIn(['Cash On Delivery', 'Online'])
      .withMessage('Payment method must be one of Cash On Delivery or Online'),
    body('delivery_address')
      .isString()
      .notEmpty()
      .withMessage('Delivery address is required'),
  ],
  validateRequest,
  orderController.createOrder
);

// Get Order by ID
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  orderController.getOrder
);

// Update Order
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('total_amount')
      .isFloat({ gt: 0 })
      .optional()
      .withMessage('Total amount must be a positive number'),
    body('status')
      .isIn(['Pending', 'Completed', 'Cancelled'])
      .optional()
      .withMessage('Status must be one of Pending, Completed, or Cancelled'),
    body('payment_status')
      .isIn(['Pending', 'Completed'])
      .optional()
      .withMessage('Payment status must be one of Pending or Completed'),
    body('payment_method')
      .isIn(['Cash On Delivery', 'Online'])
      .optional()
      .withMessage('Payment method must be one of Cash On Delivery or Online'),
    body('delivery_address')
      .isString()
      .optional()
      .withMessage('Delivery address must be a string'),
  ],
  validateRequest,
  orderController.updateOrder
);

// Delete Order
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  orderController.deleteOrder
);

module.exports = router;
