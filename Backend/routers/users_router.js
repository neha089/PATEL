const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/users_controller');

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

// Create User
router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone_number')
      .matches(/^[0-9]{10}$/)
      .withMessage('Phone number must be a 10-digit number'),
    body('address').isString().notEmpty().withMessage('Address is required'),
  ],
  validateRequest,
  userController.createUser
);

// Get User


// Update User
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ID'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('email').optional().isEmail().withMessage('Email must be valid'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone_number')
      .optional()
      .matches(/^[0-9]{10}$/)
      .withMessage('Phone number must be a 10-digit number'),
    body('address').optional().isString().withMessage('Address must be a string'),
  ],
  validateRequest,
  userController.updateUser
);

// Delete User
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  userController.deleteUser
);

// Get All Users
router.get('/all', userController.getAllUsers);
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('ID must be a valid MongoDB ID')],
  validateRequest,
  userController.getUser
);
module.exports = router;
