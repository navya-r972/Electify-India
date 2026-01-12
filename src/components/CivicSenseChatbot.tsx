"use client";

import { useState, useRef, useEffect } from "react";
import { marked } from "marked";

export default function CivicSenseChatbot() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string; typing?: boolean }[]
  >([
    {
      role: "bot",
      content:
        "Hello! I'm your CivicSense assistant. Ask me anything about the **One Nation One Election** proposal.",
    },
  ]);

  const [input, setInput] = useState("");
  const [blind, setBlind] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");

    setMessages((m) => [...m, { role: "bot", content: "CivicSense is thinking...", typing: true }]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, blind }),
      });

      const data = await res.json();

      setMessages((m) =>
        m.filter((msg) => !msg.typing).concat({
          role: "bot",
          content: data.reply,
        })
      );
    } catch {
      setMessages((m) =>
        m.filter((msg) => !msg.typing).concat({
          role: "bot",
          content: "⚠️ Backend not reachable.",
        })
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">
        One Nation, One Election
      </h2>

      <div className="flex gap-2 mb-3">
        <button onClick={() => sendMessage("Explain ONOE simply")} className="chip">
          What is ONOE?
        </button>
        <button onClick={() => sendMessage("What are the pros and cons?")} className="chip">
          Pros & Cons
        </button>
      </div>

      <div
        ref={chatRef}
        className="bg-white rounded-xl shadow h-[420px] overflow-y-auto p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-slate-100"
            }`}
            dangerouslySetInnerHTML={
              msg.role === "bot"
                ? { __html: String(marked.parse(msg.content)) }
                : undefined
            }
          >
            {msg.role === "user" && msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 border rounded-lg p-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-lg"
          onClick={() => sendMessage(input)}
        >
          Send
        </button>
      </div>

      <label className="mt-2 flex gap-2 items-center text-sm">
        <input type="checkbox" checked={blind} onChange={() => setBlind(!blind)} />
        Blind Mode
      </label>
    </div>
  );
}
