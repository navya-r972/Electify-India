"use client";

// AppLayout is now provided globally via ConditionalLayout
import { useState } from "react";
import { motion } from "framer-motion";
import FactMythGame from "@/components/learn/FactMythGame";

type Analysis = {
  verdict: "Factual" | "Potentially Misleading" | "Unsupported";
  confidence: number; // 0-100
  reasons: string[];
};

export default function FactCheckPage() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  const onAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      } else {
        console.error('Failed to analyze text');
      }
    } catch (error) {
      console.error('Error calling fact-check API', error);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setInput("");
    setAnalysis(null);
  };

  const verdictStyles = (v: Analysis["verdict"]) => {
    if (v === "Factual") return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    if (v === "Potentially Misleading") return "bg-accent-50 border-accent-200 dark:bg-accent-900/20 dark:border-accent-800";
    return "bg-secondary-50 border-secondary-200 dark:bg-secondary-900/20 dark:border-secondary-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-900 dark:text-white">Check a Fact</h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">Paste an article, paragraph, or claim to analyze its reliability.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-card dark:shadow-dark-card p-6 border border-slate-100 dark:border-dark-700"
        >
          <label htmlFor="fact-input" className="block text-sm font-medium text-charcoal-700 dark:text-gray-300 mb-2">
            Your Text
          </label>
          <textarea
            id="fact-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste your text here..."
            className="w-full rounded-lg border border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-3 text-charcoal-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onAnalyze}
              disabled={!input.trim() || loading}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors ${!input.trim() || loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700"}`}
            >
              Analyze
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-600"
            >
              Reset
            </button>
          </div>

          {loading && (
            <div className="mt-4 text-sm text-charcoal-600 dark:text-gray-300">Analyzing...</div>
          )}

          {analysis && (
            <div className={`mt-6 rounded-lg p-4 border ${verdictStyles(analysis.verdict)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {analysis.verdict === "Factual" ? (
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : analysis.verdict === "Potentially Misleading" ? (
                    <svg className="h-6 w-6 text-accent-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-secondary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <p className="font-semibold text-charcoal-900 dark:text-gray-100">{analysis.verdict}</p>
                </div>
                <span className="text-sm font-medium text-charcoal-700 dark:text-gray-300">Confidence: {analysis.confidence}%</span>
              </div>
              {analysis.reasons.length > 0 && (
                <ul className="mt-3 list-disc list-inside text-charcoal-700 dark:text-gray-300">
                  {analysis.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-charcoal-500 dark:text-gray-400">This tool provides a heuristic estimate. For formal verification, cross-check with authoritative sources.</p>
            </div>
          )}
        </motion.div>

        <div className="mt-16 border-t border-slate-200 dark:border-dark-700 pt-12">
           <FactMythGame />
        </div>
      </div>
    </div>
  );
}
