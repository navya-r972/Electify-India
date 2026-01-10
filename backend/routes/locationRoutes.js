const express = require('express');
const router = express.Router();
const {
  getLocations,
  seedLocations
} = require('../controllers/locationController');

router.route('/').get(getLocations);
router.post('/seed', seedLocations);

module.exports = router;
