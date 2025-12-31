const express = require('express');
const router = express.Router();
const {
  getStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getStations).post(protect, createStation);
router
  .route('/:id')
  .get(getStationById)
  .put(protect, updateStation)
  .delete(protect, deleteStation);

module.exports = router;
