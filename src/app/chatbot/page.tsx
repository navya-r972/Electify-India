'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content:
        "Hello! I'm here to help you understand One Nation One Election. Ask me anything about ONOE, its history, benefits, concerns, or legal aspects.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [blindMode, setBlindMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  /* -------------------- BACKEND FETCH -------------------- */
  const fetchBotResponse = async (message: string): Promise<string> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_API}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_CHATBOT_KEY!,
      },
      body: JSON.stringify({
        message,
        blind: blindMode,
      }),
    });

    if (!res.ok) {
      throw new Error('Backend error');
    }

    const data = await res.json();
    return data.reply;
  };

  /* -------------------- SEND MESSAGE -------------------- */
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const reply = await fetchBotResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: '⚠️ Unable to connect to the server. Please try again.',
        },
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

  /* -------------------- VOICE INPUT -------------------- */
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    // @ts-ignore

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.start();
  };

  const suggestedQuestions = [
    'What is ONOE?',
    'What are the benefits of ONOE?',
    'What are the concerns about ONOE?',
    'Tell me about the history of simultaneous elections in India',
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* -------------------- HEADER -------------------- */}
      <header className="border-b border-slate-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">
            ONOE Chatbot Assistant
          </h1>
          <p className="text-gray-600 mt-1">
            Ask questions about One Nation One Election
          </p>
        </div>
      </header>

      {/* -------------------- CHAT AREA -------------------- */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 border border-slate-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-3">
                Suggested questions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMessage(q)}
                    className="text-left p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-gray-700 hover:bg-slate-100 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* -------------------- INPUT AREA -------------------- */}
      <footer className="border-t border-slate-200 p-6 bg-white">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Voice Button */}
          <button
            onClick={handleVoiceInput}
            title="Voice Input"
            aria-label="Voice Input"
            className={`p-3 rounded-lg border transition ${
              isListening
                ? 'bg-red-100 border-red-400 animate-pulse'
                : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
            }`}
          >
            🎤
          </button>

          {/* Blind Mode */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={blindMode}
              onChange={() => setBlindMode(!blindMode)}
            />
            Blind Mode
          </label>

          {/* Text Input */}
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about ONOE..."
            rows={1}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              inputMessage.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
