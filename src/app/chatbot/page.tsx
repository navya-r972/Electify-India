'use client';

// AppLayout is now provided globally via ConditionalLayout
import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown";

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([
        {
            role: 'bot',
            content: "Hello! I'm here to help you understand One Nation One Election. Ask me anything about ONOE, its history, benefits, concerns, or legal aspects."
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [blindMode, setBlindMode] = useState(false);

    // Sample responses - in production, this would connect to an AI API
    const fetchBotResponse = async (message: string): Promise<string> => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/chat', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({
        message,
        blind: blindMode
        })
    });

    if (!res.ok) {
        throw new Error("Backend error");
    }

    const data = await res.json();
    return data.reply;
    };


    const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
        const reply = await fetchBotResponse(userMsg.content);

        setMessages(prev => [
            ...prev,
            { role: 'bot', content: reply }
        ]);
    } catch (error) {
        setMessages(prev => [
            ...prev,
            {
                role: 'bot',
                content: "⚠️ I'm having trouble connecting to the server. Please try again."
            }
        ]);
    } finally {
        setIsTyping(false);
    }
    };


    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestedQuestions = [
        "What is ONOE?",
        "What are the benefits of ONOE?",
        "What are the concerns about ONOE?",
        "Tell me about the history of simultaneous elections in India"
    ];

  return (
    <>
           <div className="h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-dark-900 dark:to-dark-800">
                {/* Header */}
                <div className="bg-white dark:bg-dark-800 border-b border-slate-300 dark:border-dark-700 p-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-50 mb-2">
                            ONOE Chatbot Assistant
                        </h1>
                        <p className="text-slate-700 dark:text-gray-300">
                            Ask me anything about One Nation One Election
                        </p>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-dark-800 text-slate-900 dark:text-dark-50 border border-slate-300 dark:border-dark-700'
                                        }`}
                                >
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                      <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-slate-200 dark:border-dark-700">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Suggested Questions (show only at start) */}
                        {messages.length === 1 && (
                            <div className="mt-8">
                                <p className="text-sm text-slate-700 dark:text-gray-400 mb-3">Suggested questions:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {suggestedQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setInputMessage(question)}
                                            className="text-left p-3 bg-slate-100 dark:bg-dark-700 rounded-lg text-sm text-slate-800 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-dark-600 transition-colors"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-dark-700 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex space-x-3">
                            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-gray-300 mb-2">
                                <input type="checkbox" checked={blindMode} onChange={() => setBlindMode(!blindMode)} />
                                    Blind Mode
                            </label>
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask a question about ONOE..."
                                rows={1}
                                className="flex-1 px-4 py-3 border border-slate-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-500 dark:bg-dark-700 dark:text-dark-50 resize-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim()}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${inputMessage.trim()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-slate-300 text-slate-600 cursor-not-allowed'
                                    }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
}