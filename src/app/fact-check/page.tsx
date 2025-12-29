'use client';

import AppLayout from '@/components/layout/AppLayout';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sample claims and facts - in production, these would come from a database
const claimsData = [
    {
        id: 1,
        claim: "One Nation One Election will save ₹1 lakh crore every year.",
        fact: "While ONOE may reduce election costs, the exact savings are debated. The Election Commission's expenditure varies significantly between elections. Independent estimates suggest savings would be substantial but likely lower than ₹1 lakh crore annually.",
        source: "Election Commission of India reports, Independent analysis",
        category: "Economics",
        containsNames: false
    },
    {
        id: 2,
        claim: "ONOE is unconstitutional and cannot be implemented without destroying federalism.",
        fact: "ONOE is not explicitly unconstitutional. India had simultaneous elections from 1951-1967. Implementation would require constitutional amendments, but legal experts have varying opinions on its impact on federalism. The Law Commission has examined its feasibility.",
        source: "Law Commission Report, Constitutional experts",
        category: "Legal",
        containsNames: false
    },
    {
        id: 3,
        claim: "Party A wants ONOE only to gain electoral advantage over Party B and Party C.",
        fact: "ONOE has been discussed by multiple governments and committees over decades, regardless of which party is in power. The concept was recommended by the Law Commission in 1999 and again examined in 2015. Support and opposition exist across party lines.",
        source: "Law Commission reports (1999, 2015), Parliamentary records",
        category: "Political",
        containsNames: true,
        blindVersion: {
            claim: "Party A wants ONOE only to gain electoral advantage over Party B and Party C.",
            fact: "ONOE has been discussed by multiple governments and committees over decades, regardless of which party is in power. The concept was recommended by the Law Commission in 1999 and again examined in 2015. Support and opposition exist across party lines."
        }
    },
    {
        id: 4,
        claim: "ONOE will reduce voter turnout because people won't understand complex ballots.",
        fact: "Evidence from India's early years (1951-1967) when simultaneous elections were held does not show reduced voter turnout. However, ballot design and voter education would be important considerations. The Election Commission has experience managing complex elections.",
        source: "Historical election data, Election Commission of India",
        category: "Electoral Process",
        containsNames: false
    },
    {
        id: 5,
        claim: "Leader X said ONOE will end democracy in India.",
        fact: "ONOE is a procedural change to election timing, not a change to democratic principles. Various political leaders have expressed different views. The actual impact on democracy would depend on implementation details and safeguards. Constitutional experts have diverse opinions.",
        source: "Public statements, Constitutional analysis",
        category: "Political",
        containsNames: true,
        blindVersion: {
            claim: "Leader X said ONOE will end democracy in India.",
            fact: "ONOE is a procedural change to election timing, not a change to democratic principles. Various political leaders have expressed different views. The actual impact on democracy would depend on implementation details and safeguards. Constitutional experts have diverse opinions."
        }
    }
];

export default function FactCheckPage() {
    const [blindMode, setBlindMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Economics', 'Legal', 'Political', 'Electoral Process'];

    const filteredClaims = selectedCategory === 'All'
        ? claimsData
        : claimsData.filter(c => c.category === selectedCategory);

    // Simple name masking function (in production, this would be more sophisticated)
    const maskNames = (text: string) => {
        let masked = text;
        masked = masked.replace(/Party A/g, 'Party A');
        masked = masked.replace(/Party B/g, 'Party B');
        masked = masked.replace(/Party C/g, 'Party C');
        masked = masked.replace(/Leader X/g, 'Leader A');
        masked = masked.replace(/Leader Y/g, 'Leader B');
        return masked;
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-dark-900 dark:to-dark-800 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-dark-50">
                            Claim vs Fact
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Identify misinformation about ONOE with neutral, source-based fact-checking
                        </p>
                    </div>

                    {/* Blind Reading Mode Toggle */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="text-2xl mr-2">🕶️</span>
                                        <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                                            Blind Reading Mode
                                        </h3>
                                    </div>
                                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                                        Hide party and leader names to focus on the content without bias. This helps you evaluate claims based on facts, not your existing opinions about specific parties or individuals.
                                    </p>
                                    <p className="text-xs text-purple-700 dark:text-purple-300">
                                        When enabled, names are replaced with neutral placeholders like "Party A", "Leader B", etc.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setBlindMode(!blindMode)}
                                    className={`ml-4 relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${blindMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${blindMode ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-700 hover:border-blue-400'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Claims List */}
                    <div className="max-w-5xl mx-auto space-y-6">
                        {filteredClaims.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-slate-100 dark:border-dark-700 overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-dark-700">
                                    {/* Claim Side */}
                                    <div className="p-6 bg-red-50 dark:bg-red-900/10">
                                        <div className="flex items-center mb-3">
                                            <div className="bg-red-100 dark:bg-red-900/30 rounded-full px-3 py-1">
                                                <span className="text-sm font-bold text-red-800 dark:text-red-300">CLAIM</span>
                                            </div>
                                            <span className="ml-auto text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-700 px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                            "{blindMode && item.containsNames && item.blindVersion
                                                ? maskNames(item.blindVersion.claim)
                                                : item.claim}"
                                        </p>
                                    </div>

                                    {/* Fact Side */}
                                    <div className="p-6 bg-green-50 dark:bg-green-900/10">
                                        <div className="flex items-center mb-3">
                                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1">
                                                <span className="text-sm font-bold text-green-800 dark:text-green-300">VERIFIED INFORMATION</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                                            {blindMode && item.containsNames && item.blindVersion
                                                ? maskNames(item.blindVersion.fact)
                                                : item.fact}
                                        </p>
                                        <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs">
                                                <strong>Source:</strong> {item.source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                                How We Verify Information
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>We cross-reference claims with official government documents and Election Commission data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>We consult Law Commission reports and constitutional expert analyses</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>We present multiple perspectives when experts disagree, without taking sides</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>We avoid advocacy language and focus on factual, verifiable information</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
