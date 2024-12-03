const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const categoryController = require('../controllers/category_controller'); // Replace with the actual path to your controller
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

// Create Category
router.post(
  '/',
  [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('description').isString().optional().withMessage('Description must be a string'),
  ],
  validateRequest,
  categoryController.createCategory
);

// Get Category by ID
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  categoryController.getCategory
);

// Update Category
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('name').isString().optional().withMessage('Name must be a string'),
    body('description').isString().optional().withMessage('Description must be a string'),
  ],
  validateRequest,
  categoryController.updateCategory
);

// Delete Category
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  categoryController.deleteCategory
);

module.exports = router;
