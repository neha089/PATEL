const Review = require('../models/review');

// Create Review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    if (error.code === 11000) {
      // Handle unique constraint violation for `user_id` + `food_id`
      return res.status(400).json({ message: 'User has already reviewed this food item' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get Review
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(['user_id', 'food_id']);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Reviews for a Food Item
exports.getReviewsByFood = async (req, res) => {
  try {
    const reviews = await Review.find({ food_id: req.params.food_id }).populate('user_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Reviews by a User
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.params.user_id }).populate('food_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
