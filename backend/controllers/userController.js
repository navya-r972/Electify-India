const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      school: user.school,
      grade: user.grade,
      interests: user.interests,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.school = req.body.school || user.school;
    user.grade = req.body.grade || user.grade;
    user.interests = req.body.interests || user.interests;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      school: updatedUser.school,
      grade: updatedUser.grade,
      interests: updatedUser.interests,
      token: req.headers.authorization.split(' ')[1], // Return existing token
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
