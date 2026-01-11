"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FactCheckResponse = {
  verdict: "True" | "False" | "Misleading";
  validity_percentage: number;
  reasoning: string;
};

export default function FactCheckPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<FactCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onVerifyFact = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/fact-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim: input }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to verify fact');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  const getVerdictStyles = (verdict: string) => {
    if (verdict === "True") return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-200";
    if (verdict === "False") return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-200";
    return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === "True") {
      return (
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (verdict === "False") {
      return (
        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return (
      <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-900 dark:text-white">Fact Checker</h1>
          <p className="text-lg text-charcoal-800 dark:text-gray-300">Enter a claim to verify its accuracy using AI.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-card dark:shadow-dark-card p-6 border border-slate-100 dark:border-dark-700"
        >
          <label htmlFor="fact-input" className="block text-sm font-medium text-charcoal-900 dark:text-gray-300 mb-2">
            Your Claim
          </label>
          <textarea
            id="fact-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Enter a claim to verify..."
            className="w-full rounded-lg border border-slate-300 dark:border-dark-700 bg-white dark:bg-dark-800 p-3 text-charcoal-900 placeholder:text-charcoal-500 dark:text-gray-100 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onVerifyFact}
              disabled={!input.trim() || loading}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                !input.trim() || loading
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify Fact"}
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-900 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-600 font-medium"
            >
              Reset
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {loading && (
            <div className="mt-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-charcoal-800 dark:text-gray-300">Analyzing your claim...</span>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 rounded-xl p-6 border ${getVerdictStyles(result.verdict)}`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getVerdictIcon(result.verdict)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{result.verdict}</h3>
                <div className="mb-4">
                  <div className="text-4xl font-bold mb-2">{result.validity_percentage}%</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        result.verdict === "True" ? "bg-green-600" : 
                        result.verdict === "False" ? "bg-red-600" : "bg-yellow-600"
                      }`}
                      style={{ width: `${result.validity_percentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-charcoal-900 dark:text-gray-300">{result.reasoning}</p>
              </div>
            </motion.div>
          )}
        </motion.div>


      </div>
    </div>
  );
}
