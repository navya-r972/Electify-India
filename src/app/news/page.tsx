'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';

import Link from 'next/link';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: 'New National Education Policy Implementation Timeline Released',
      date: 'June 15, 2023',
      category: 'policy',
      isGovernmentNotice: true,
      description: 'The Ministry of Education has released a detailed timeline for the implementation of the National Education Policy 2020 across all states and union territories.',
      url: '#'
    },
    {
      id: 2,
      title: 'Prime Minister Scholarship Scheme Applications Open',
      date: 'July 2, 2023',
      category: 'scholarships',
      isGovernmentNotice: true,
      description: 'Applications are now open for the Prime Minister Scholarship Scheme for the academic year 2023-24. Eligible students can apply online until August 15, 2023.',
      url: '#'
    },
    {
      id: 3,
      title: 'JEE Main 2023 Results Announced',
      date: 'July 10, 2023',
      category: 'exams',
      isGovernmentNotice: false,
      description: 'The National Testing Agency (NTA) has announced the results for JEE Main 2023. Students can check their scores on the official website.',
      url: '#'
    },
    {
      id: 4,
      title: 'New Digital Learning Platform Launched for Rural Schools',
      date: 'June 28, 2023',
      category: 'general',
      isGovernmentNotice: false,
      description: 'A new digital learning platform has been launched to provide quality education resources to students in rural areas with limited internet connectivity.',
      url: '#'
    },
    {
      id: 5,
      title: 'Changes in NEET Exam Pattern for 2024',
      date: 'July 15, 2023',
      category: 'exams',
      isGovernmentNotice: true,
      description: 'The National Medical Commission has announced significant changes to the NEET exam pattern for 2024, including new question formats and marking schemes.',
      url: '#'
    },
    {
      id: 6,
      title: 'Merit-cum-Means Scholarship Program Expanded',
      date: 'July 5, 2023',
      category: 'scholarships',
      isGovernmentNotice: false,
      description: 'The Merit-cum-Means Scholarship Program has been expanded to include more disciplines and increased financial support for eligible students.',
      url: '#'
    },
    {
      id: 7,
      title: 'New Guidelines for School Safety and Security',
      date: 'June 20, 2023',
      category: 'policy',
      isGovernmentNotice: true,
      description: 'The Ministry of Education has issued comprehensive guidelines for ensuring safety and security in schools across the country.',
      url: '#'
    },
    {
      id: 8,
      title: 'International Education Conference to be Held in Delhi',
      date: 'July 18, 2023',
      category: 'general',
      isGovernmentNotice: false,
      description: 'An international conference on education innovation and technology will be held in New Delhi from September 5-7, 2023.',
      url: '#'
    }
  ];

  // Filter news items based on active tab
  const filteredNews = activeTab === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeTab);

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            News & Updates
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Stay informed with the latest education news, policies, and opportunities
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'scholarships' ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              Scholarships
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'policy' ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              Policy Updates
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'exams' ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              Exams & Results
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-primary-500 text-primary-600 dark:text-primary-400 dark:border-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}`}
            >
              General Education News
            </button>
          </nav>
        </div>
        
        {/* News List */}
        <div className="space-y-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <div key={item.id} className="bg-white dark:bg-dark-card rounded-lg shadow-card dark:shadow-dark-card overflow-hidden border border-transparent dark:border-dark-700">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                        {item.isGovernmentNotice && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Govt Notice
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {item.date}
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href={item.url}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
                    >
                      Read More
                      <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No news found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}