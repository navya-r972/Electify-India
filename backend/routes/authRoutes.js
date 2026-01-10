const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');
const {
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
