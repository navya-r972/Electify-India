const express = require('express');
const router = express.Router();
const { analyzeText } = require('../controllers/factCheckController');

router.post('/analyze', analyzeText);

module.exports = router;
