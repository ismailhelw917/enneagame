import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Sparkles, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const EnneagramChatbot = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Enneagram Guide. I can help you discover your type by asking a few questions about your motivations, fears, and how you react to the world. Ready to start?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Reconstruct history for the chat
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite-preview",
        config: {
          systemInstruction: `You are an expert Enneagram consultant. Your goal is to help the user discover their Enneagram type (1-9). 
          
          Guidelines:
          1. Be empathetic, insightful, and professional.
          2. Ask one question at a time to explore their core motivations, fears, and behaviors.
          3. Focus on "Why" they do things, not just "What" they do.
          4. If they seem like a specific type, gently suggest it and explain why, but let them confirm.
          5. Keep responses concise and engaging.
          6. Use the context of the conversation to narrow down the possibilities.
          7. If they mention gaming, relate the Enneagram types to gaming roles (e.g., Type 1 as precision support, Type 8 as IGL).`,
        },
        history: history.map(h => ({ role: h.role as "user" | "model", parts: h.parts }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const botText = response.text || "I'm sorry, I couldn't process that. Could you try again?";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having a bit of trouble connecting to my knowledge base. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'bot', text: "Hello! I'm your Enneagram Guide. I can help you discover your type by asking a few questions about your motivations, fears, and how you react to the world. Ready to start?" }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Bot className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">Enneagram Guide</h2>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">AI Discovery Assistant</p>
          </div>
        </div>
        <button 
          onClick={resetChat}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          title="Reset Conversation"
        >
          <RefreshCcw className="w-4 h-4 sm:w-5 h-5" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 px-2 sm:pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] sm:max-w-[80%] flex gap-2 sm:gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 flex items-center justify-center border ${
                  m.role === 'user' 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-cyan-500/10 border-cyan-500/20'
                }`}>
                  {m.role === 'user' ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />}
                </div>
                <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-white/10 text-white rounded-tr-none' 
                    : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-2 sm:gap-3 items-center bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none">
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-spin" />
              <span className="text-[10px] sm:text-xs text-gray-400 font-mono">Analyzing psyche...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 sm:mt-6 relative px-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your response..."
          className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-4 sm:pl-6 pr-12 sm:pr-16 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-all"
        >
          <Send className="w-4 h-4 sm:w-5 h-5" />
        </button>
      </div>
      
      <p className="mt-3 sm:mt-4 text-[9px] sm:text-[10px] text-center text-gray-600 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
        <Sparkles className="w-2.5 h-2.5 sm:w-3 h-3" /> Powered by Gemini Intelligence
      </p>
    </div>
  );
};

export default EnneagramChatbot;
