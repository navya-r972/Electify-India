'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const resources = [
  {
    id: 1,
    category: "Official Documents",
    items: [
      {
        title: "Constitution of India",
        description: "Articles 83 and 172 regarding the term of Parliament and State Legislatures",
        type: "PDF",
        source: "Ministry of Law and Justice",
        url: "https://legislative.gov.in/constitution-of-india"
      },
      {
        title: "Election Commission Reports",
        description: "Official data on election expenditure and logistics",
        type: "Website",
        source: "Election Commission of India",
        url: "https://eci.gov.in/"
      },
      {
        title: "Law Commission Report No. 170",
        description: "Reform of the Electoral Laws - First report on simultaneous elections",
        type: "PDF",
        source: "Law Commission of India",
        url: "#"
      },
      {
        title: "NITI Aayog Analysis",
        description: "Analysis of Simultaneous Elections: Constitutional and Legal Perspectives",
        type: "PDF",
        source: "NITI Aayog",
        url: "#"
      }
    ]
  },
  {
    id: 2,
    category: "Research & Analysis",
    items: [
      {
        title: "Economic Impact Study",
        description: "Independent analysis of potential cost savings",
        type: "Research",
        source: "Economic Research Institute",
        url: "#"
      },
      {
        title: "Federal Structure Analysis",
        description: "Impact on India's federal system",
        type: "Article",
        source: "Political Science Review",
        url: "#"
      }
    ]
  },
  {
    id: 3,
    category: "Historical Data",
    items: [
      {
        title: "1951-1967 Election Data",
        description: "Historical records of simultaneous elections",
        type: "Data",
        source: "ECI Archives",
        url: "#"
      },
      {
        title: "Electoral Reform Timeline",
        description: "Chronology of electoral changes in India",
        type: "Article",
        source: "History Department",
        url: "#"
      }
    ]
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Resources Library</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Access official documents, reports, and analyses.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === null 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-300 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
            }`}
          >
            All
          </button>
          {resources.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat.category 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-300 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filteredResources.map((category) => (
            <div key={category.id}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-l-4 border-primary-600 pl-4">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-gray-100 dark:border-dark-700 relative overflow-hidden group hover:border-primary-200 transition-colors"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-bl-lg text-xs font-semibold text-primary-600 dark:text-primary-300">
                      {item.type}
                    </div>
                    
                    <div className="mb-4 text-primary-600 dark:text-primary-400">
                      {item.type === 'PDF' ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      ) : item.type === 'Website' ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                      Source: {item.source}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
