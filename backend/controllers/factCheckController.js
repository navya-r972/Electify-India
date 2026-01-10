// @desc    Analyze text for fact checking
// @route   POST /api/fact-check/analyze
// @access  Public
const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        // Logic ported from frontend
        const lowerText = text.toLowerCase();
        let score = 50;
        const reasons = [];
      
        const sensational = ["₹", "crore", "always", "never", "guaranteed", "everyone", "100%", "promised", "massive"];
        const authority = ["source:", "eci", "election commission", "law commission", "report no.", "pdf", "doi", "http://", "https://", "footnote", "appendix"];
        const hedging = ["may", "could", "suggests", "likely", "estimates", "appears"];
      
        if (sensational.some(k => lowerText.includes(k))) {
          score -= 15;
          reasons.push("Contains sensational or absolute phrasing.");
        }
        if (authority.some(k => lowerText.includes(k))) {
          score += 20;
          reasons.push("Mentions sources or authoritative references.");
        }
        if (hedging.some(k => lowerText.includes(k))) {
          score += 5;
          reasons.push("Uses cautious/hedging language rather than absolutes.");
        }
        
        const linkCount = (text.match(/https?:\/\//g) || []).length;
        if (linkCount >= 2) {
          score += 10;
          reasons.push("Multiple external references/links present.");
        }
      
        const length = text.trim().length;
        if (length < 40) {
          score -= 20;
          reasons.push("Very short or out-of-context claim.");
        } else if (length > 500) {
          score += 5;
          reasons.push("Longer context provided.");
        }
      
        if (score < 0) score = 0;
        if (score > 100) score = 100;
      
        let verdict = "Unsupported";
        if (score >= 70) verdict = "Factual";
        else if (score >= 40) verdict = "Potentially Misleading";

        res.status(200).json({
            verdict,
            confidence: Math.round(score),
            reasons
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { analyzeText };
