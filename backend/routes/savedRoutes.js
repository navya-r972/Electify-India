const express = require('express');
const router = express.Router();
const {
  getSavedItems,
  saveItem,
  deleteSavedItem
} = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSavedItems).post(protect, saveItem);
router.route('/:id').delete(protect, deleteSavedItem);

module.exports = router;
