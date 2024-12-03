const express = require('express');
const { body, param } = require('express-validator'); // Import validation functions
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Helper function to handle validation errors
const validateRequest = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CRUD Routes

// Create Review
router.post(
  '/',
  [
    body('user_id').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    body('food_id').isMongoId().withMessage('Food ID must be a valid MongoDB ID'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('review_text').optional().isString().withMessage('Review text must be a string'),
  ],
  validateRequest,
  reviewController.createReview
);

// Get Review
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  reviewController.getReview
);

// Update Review
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('review_text').optional().isString().withMessage('Review text must be a string'),
  ],
  validateRequest,
  reviewController.updateReview
);

// Delete Review
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  reviewController.deleteReview
);

module.exports = router;
