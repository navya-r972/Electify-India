const express = require('express');
const router = express.Router();
const {
  getQuizHistory,
  submitQuizResult
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.route('/history').get(protect, getQuizHistory);
router.route('/submit').post(protect, submitQuizResult);

module.exports = router;
