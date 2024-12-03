const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const foodController = require('../controllers/food_controller');

// Helper function to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CRUD Routes

// Create Food
router.post(
  '/',
  [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('description').isString().optional(),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('discount_price')
      .isFloat({ gt: 0 })
      .withMessage('Discount price must be a positive number')
      .optional(),
    body('stock_quantity').isInt({ gt: 0 }).withMessage('Stock quantity must be a positive integer'),
    body('category').optional().isMongoId().withMessage('Category must be a valid MongoDB ID'),
    body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
  ],
  validateRequest,
  foodController.createFood
);

// Get Food
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  foodController.getFood
);

// Update Food
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('name').isString().optional().withMessage('Name must be a string'),
    body('description').isString().optional(),
    body('price').isFloat({ gt: 0 }).optional().withMessage('Price must be a positive number'),
    body('discount_price')
      .isFloat({ gt: 0 })
      .optional()
      .withMessage('Discount price must be a positive number'),
    body('stock_quantity').isInt({ gt: 0 }).optional().withMessage('Stock quantity must be a positive integer'),
    body('category').optional().isMongoId().withMessage('Category must be a valid MongoDB ID'),
    body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
  ],
  validateRequest,
  foodController.updateFood
);

// Delete Food
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  foodController.deleteFood
);

module.exports = router;
