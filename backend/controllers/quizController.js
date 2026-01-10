const QuizResult = require('../models/QuizResult');

// @desc    Get user quiz history
// @route   GET /api/quizzes/history
// @access  Private
const getQuizHistory = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit quiz result
// @route   POST /api/quizzes/submit
// @access  Private
const submitQuizResult = async (req, res) => {
  try {
    const { score, totalQuestions, recommendation } = req.body;

    if (score === undefined || totalQuestions === undefined) {
        return res.status(400).json({ message: 'Score and Total Questions are required' });
    }

    const result = await QuizResult.create({
        user: req.user.id,
        score,
        totalQuestions,
        recommendation
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizHistory,
  submitQuizResult,
};
