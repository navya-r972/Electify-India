const SavedItem = require('../models/SavedItem');

// @desc    Get all saved items
// @route   GET /api/saved
// @access  Private
const getSavedItems = async (req, res) => {
  try {
    const items = await SavedItem.find({ user: req.user.id }).sort({ savedDate: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save an item
// @route   POST /api/saved
// @access  Private
const saveItem = async (req, res) => {
  try {
    const { title, type, url } = req.body;

    if (!title || !type || !url) {
        return res.status(400).json({ message: 'Please provide title, type and url' });
    }

    // Check if already saved
    const exists = await SavedItem.findOne({ user: req.user.id, url });
    if (exists) {
        return res.status(400).json({ message: 'Item already saved' });
    }

    const item = await SavedItem.create({
        user: req.user.id,
        title,
        type,
        url
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a saved item
// @route   DELETE /api/saved/:id
// @access  Private
const deleteSavedItem = async (req, res) => {
  try {
    const item = await SavedItem.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    await item.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSavedItems,
  saveItem,
  deleteSavedItem,
};
