const express = require('express');
const router = express.Router();
const { chatMessage } = require('../controllers/chatbotController');

router.post('/message', chatMessage);

module.exports = router;
