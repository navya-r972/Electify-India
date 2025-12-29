'use client';

// AppLayout is now provided globally via ConditionalLayout
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const modules = [
    {
        id: 1,
        title: "What is One Nation One Election?",
        description: "Understand the basic concept and what it means for India's electoral system",
        icon: "📚",
        content: [
            {
                heading: "The Concept",
                text: "One Nation One Election (ONOE) refers to the idea of holding simultaneous elections to the Lok Sabha (Parliament) and all State Legislative Assemblies across India. Currently, elections are held separately at different times."
            },
            {
                heading: "Current System",
                text: "Today, India conducts elections for the Lok Sabha every five years, and elections for State Assemblies are held separately based on each state's election cycle. This means elections happen almost continuously somewhere in the country."
            },
            {
                heading: "Proposed Change",
                text: "Under ONOE, all these elections would be synchronized and held together on the same day or within a short period, reducing the frequency of elections across the nation."
            }
        ]
    },
    {
        id: 2,
        title: "Constitutional & Legal Aspects",
        description: "Learn about the constitutional framework and legal considerations",
        icon: "⚖️",
        content: [
            {
                heading: "Constitutional Provisions",
                text: "The Indian Constitution does not explicitly mandate or prohibit simultaneous elections. Articles 83 and 172 specify the five-year term for Lok Sabha and State Assemblies respectively."
            },
            {
                heading: "Required Amendments",
                text: "Implementing ONOE would likely require amendments to the Constitution, particularly regarding the dissolution of assemblies and handling of hung assemblies or no-confidence motions."
            },
            {
                heading: "Legal Challenges",
                text: "Key legal questions include: How to handle mid-term dissolutions? What happens if a government falls before completing its term? How to maintain the federal structure?"
            }
        ]
    },
    {
        id: 3,
        title: "Historical Context",
        description: "Explore India's history with simultaneous elections",
        icon: "📜",
        content: [
            {
                heading: "Early Years (1951-1967)",
                text: "India actually had simultaneous elections from 1951 to 1967. The first four general elections were held together with state assembly elections."
            },
            {
                heading: "Why It Changed",
                text: "The cycle broke due to premature dissolution of some state assemblies and the Lok Sabha. Political instability and defections led to staggered election schedules."
            },
            {
                heading: "Recent Discussions",
                text: "The idea was revived in recent years. The Law Commission and NITI Aayog have submitted reports examining the feasibility and implications of returning to simultaneous elections."
            }
        ]
    },
    {
        id: 4,
        title: "Potential Benefits",
        description: "Understand the arguments in favor of ONOE",
        icon: "✅",
        content: [
            {
                heading: "Reduced Election Costs",
                text: "Proponents argue that holding elections together could significantly reduce the financial burden on the government and political parties."
            },
            {
                heading: "Governance Continuity",
                text: "With fewer elections, the Model Code of Conduct would be in effect less frequently, potentially allowing for more continuous policy implementation."
            },
            {
                heading: "Administrative Efficiency",
                text: "Security forces, election officials, and administrative resources could be deployed more efficiently in a single, coordinated effort."
            }
        ]
    },
    {
        id: 5,
        title: "Concerns & Challenges",
        description: "Explore the concerns raised about implementing ONOE",
        icon: "⚠️",
        content: [
            {
                heading: "Federal Structure",
                text: "Critics argue that ONOE could undermine India's federal structure by reducing the focus on state-specific issues during elections."
            },
            {
                heading: "Logistical Complexity",
                text: "Managing simultaneous elections across a country as large and diverse as India presents enormous logistical challenges, including EVM availability and security deployment."
            },
            {
                heading: "Democratic Accountability",
                text: "Some experts worry that less frequent elections could reduce opportunities for citizens to hold governments accountable through the ballot."
            }
        ]
    }
];

export default function LearnPage() {
    const [selectedModule, setSelectedModule] = useState<number | null>(null);
    const [completedModules, setCompletedModules] = useState<number[]>([]);

    const handleModuleComplete = (moduleId: number) => {
        if (!completedModules.includes(moduleId)) {
            setCompletedModules([...completedModules, moduleId]);
        }
    };

    const currentModule = modules.find(m => m.id === selectedModule);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-dark-900 dark:to-dark-800 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-dark-50">
                            Learn About ONOE
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Understand One Nation One Election through structured, easy-to-follow modules
                        </p>
                        <div className="mt-6">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                    Progress: {completedModules.length} / {modules.length} modules completed
                                </span>
                            </div>
                        </div>
                    </div>

                    {!selectedModule ? (
                        /* Module Selection Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {modules.map((module) => (
                                <motion.div
                                    key={module.id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-dark-700 cursor-pointer transition-colors duration-200"
                                    onClick={() => setSelectedModule(module.id)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-4xl">{module.icon}</div>
                                        {completedModules.includes(module.id) && (
                                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                                                <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-dark-50">
                                        Module {module.id}: {module.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        {module.description}
                                    </p>
                                    <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm font-medium">
                                        <span>Start Learning →</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* Module Content View */
                        <div className="max-w-4xl mx-auto">
                            <button
                                onClick={() => setSelectedModule(null)}
                                className="mb-6 inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Modules
                            </button>

                            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 border border-slate-100 dark:border-dark-700">
                                <div className="flex items-start mb-6">
                                    <div className="text-5xl mr-4">{currentModule?.icon}</div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-dark-50">
                                            {currentModule?.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {currentModule?.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {currentModule?.content.map((section, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-l-4 border-slate-500 pl-6 py-2"
                                        >
                                            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-dark-50">
                                                {section.heading}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {section.text}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => handleModuleComplete(currentModule!.id)}
                                            className={`px-6 py-3 rounded-lg font-medium transition-all ${completedModules.includes(currentModule!.id)
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                : 'bg-slate-600 text-white hover:bg-slate-700'
                                                }`}
                                        >
                                            {completedModules.includes(currentModule!.id) ? '✓ Completed' : 'Mark as Complete'}
                                        </button>

                                        {currentModule && currentModule.id < modules.length && (
                                            <button
                                                onClick={() => setSelectedModule(currentModule.id + 1)}
                                                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                                            >
                                                Next Module →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Audio Player Placeholder */}
                            <div className="mt-6 bg-slate-100 dark:bg-dark-700 rounded-lg p-4 border border-slate-200 dark:border-dark-600">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-slate-600 rounded-full p-3 mr-4">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-dark-50">Audio Explanation</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Listen to this module</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                                        Play Audio
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
