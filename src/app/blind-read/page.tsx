'use client';

// AppLayout is provided globally via ConditionalLayout
import { useState } from 'react';
import { motion } from 'framer-motion';
import BlindFeed from '../../../blind-read/BlindFeed';

export default function BlindReadPage() {
  const [mode, setMode] = useState<'paste' | 'news'>('news');

  // Paste mode state
  const [inputText, setInputText] = useState('');
  const [blindReadEnabled, setBlindReadEnabled] = useState(false);
  const [anonymizedText, setAnonymizedText] = useState('');

  // Simple mapping for paste mode
  const nameMapping: Record<string, string> = {
    BJP: 'Party A',
    'Bharatiya Janata Party': 'Party A',
    Congress: 'Party B',
    'Indian National Congress': 'Party B',
    INC: 'Party B',
    AAP: 'Party C',
    'Aam Aadmi Party': 'Party C',
    TMC: 'Party D',
    'Trinamool Congress': 'Party D',
    DMK: 'Party E',
    'Prime Minister': 'Leader A',
    PM: 'Leader A',
    'Chief Minister': 'Leader B',
    CM: 'Leader B',
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnableBlindRead = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/blind/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnonymizedText(data.blindText);
        setBlindReadEnabled(true);
      }
    } catch (error) {
      console.error('Failed to anonymize text', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setBlindReadEnabled(false);
    setAnonymizedText('');
  };

  const sampleText = `The Prime Minister announced that the BJP supports One Nation One Election.
The Congress party raised concerns. The Chief Minister said regional parties like TMC and DMK must be consulted.`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🕶️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal-900 dark:text-white">
            Blind Reading Mode
          </h1>
          <p className="text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
            Remove political bias by hiding identities before judging content
          </p>
        </div>

        {/* Mode Switch */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('news')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              mode === 'news'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white dark:bg-dark-800 text-charcoal-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
            }`}
          >
            Live News
          </button>
          <button
            onClick={() => setMode('paste')}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              mode === 'paste'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white dark:bg-dark-800 text-charcoal-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
            }`}
          >
            Paste Text
          </button>
        </div>

        {/* ========== LIVE NEWS MODE ========== */}
        {mode === 'news' && (
          <div className="mt-6">
            <BlindFeed />
          </div>
        )}

        {/* ========== PASTE MODE ========== */}
        {mode === 'paste' && (
          !blindReadEnabled ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-8 border border-gray-100 dark:border-dark-700">
                <h2 className="text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">Paste Your Text</h2>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste any political article here..."
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg mb-4 bg-white dark:bg-dark-700 text-charcoal-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setInputText(sampleText)}
                    className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                  >
                    Load Sample Text
                  </button>

                  <button
                    onClick={handleEnableBlindRead}
                    disabled={!inputText.trim() || isProcessing}
                    className={`px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md ${(!inputText.trim() || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? 'Processing...' : 'Read Blindly'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-card border border-gray-100 dark:border-dark-700">
                <h3 className="font-bold mb-2 text-charcoal-900 dark:text-white">Original Text</h3>
                <p className="whitespace-pre-wrap text-charcoal-700 dark:text-gray-300">{inputText}</p>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-800">
                <h3 className="font-bold mb-2 text-charcoal-900 dark:text-white">Blind Read Version</h3>
                <p className="whitespace-pre-wrap text-charcoal-700 dark:text-gray-300">{anonymizedText}</p>
              </div>

              <div className="lg:col-span-2 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-white dark:bg-dark-700 text-charcoal-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors shadow-sm"
                >
                  Try Another Text
                </button>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

