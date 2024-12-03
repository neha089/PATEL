const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const paymentController = require('../controllers/payment_controller'); // Replace with the actual path to your controller
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

// Create Payment
router.post(
  '/',
  [
    body('order_id').isMongoId().withMessage('Order ID must be a valid MongoDB ID'),
    body('payment_method')
      .isIn(['Cash On Delivery', 'Online'])
      .withMessage('Payment method must be one of Cash On Delivery or Online'),
    body('payment_status')
      .isIn(['Pending', 'Completed'])
      .withMessage('Payment status must be one of Pending or Completed'),
    body('transaction_id').isString().optional().withMessage('Transaction ID must be a string'),
    body('amount_paid')
      .isFloat({ gt: 0 })
      .withMessage('Amount paid must be a positive number'),
  ],
  validateRequest,
  paymentController.createPayment
);

// Get Payment by ID
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  paymentController.getPayment
);

// Update Payment
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('payment_method')
      .isIn(['Cash On Delivery', 'Online'])
      .optional()
      .withMessage('Payment method must be one of Cash On Delivery or Online'),
    body('payment_status')
      .isIn(['Pending', 'Completed'])
      .optional()
      .withMessage('Payment status must be one of Pending or Completed'),
    body('transaction_id')
      .isString()
      .optional()
      .withMessage('Transaction ID must be a string'),
    body('amount_paid')
      .isFloat({ gt: 0 })
      .optional()
      .withMessage('Amount paid must be a positive number'),
  ],
  validateRequest,
  paymentController.updatePayment
);

// Delete Payment
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  paymentController.deletePayment
);

module.exports = router;
