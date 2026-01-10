const mongoose = require('mongoose');

const savedItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String, // 'Learning Module', 'Fact Check', 'Resource'
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    savedDate: {
        type: Date,
        default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

const SavedItem = mongoose.model('SavedItem', savedItemSchema);

module.exports = SavedItem;
