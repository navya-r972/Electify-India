const fs = require("fs");
const path = require("path");

const getLanguage = (req, res) => {
  const { language } = req.body;

  const supportedLanguages = ["en", "hi", "bn", "ur"];

  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({ message: "Language not supported" });
  }

  try {
    const filePath = path.join(__dirname, "../locales", `${language}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    const translations = JSON.parse(data);

    return res.status(200).json(translations);
  } catch (err) {
    return res.status(500).json({ message: "Error loading language file" });
  }
};

module.exports = { getLanguage };
