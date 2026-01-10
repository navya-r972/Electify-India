const mongoose = require('mongoose');

const userProgressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true
    },
    completedLevels: [{
      type: String, // e.g., "level-1", "level-2"
    }],
    xp: {
      type: Number,
      default: 0,
    },
    lastVisitedRoute: {
      type: String,
      default: '/learn'
    }
  },
  {
    timestamps: true,
  }
);

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
