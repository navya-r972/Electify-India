const UserProgress = require('../models/UserProgress');

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ user: req.user.id });

    if (!progress) {
      // Create default progress if not exists
      progress = await UserProgress.create({
        user: req.user.id,
        completedLevels: [],
        xp: 0,
        lastVisitedRoute: '/learn'
      });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user progress
// @route   POST /api/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const { completedLevel, xpToAdd, lastVisitedRoute } = req.body;
    
    let progress = await UserProgress.findOne({ user: req.user.id });

    if (!progress) {
        progress = new UserProgress({ user: req.user.id });
    }

    if (completedLevel && !progress.completedLevels.includes(completedLevel)) {
        progress.completedLevels.push(completedLevel);
    }

    if (xpToAdd) {
        progress.xp += Number(xpToAdd);
    }

    if (lastVisitedRoute) {
        progress.lastVisitedRoute = lastVisitedRoute;
    }

    const updatedProgress = await progress.save();
    res.status(200).json(updatedProgress);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgress,
  updateProgress,
};
