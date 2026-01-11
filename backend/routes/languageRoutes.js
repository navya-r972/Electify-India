const express = require("express");
const { getLanguage } = require("../controllers/languageController");

const router = express.Router();

router.post("/", getLanguage);

module.exports = router;
