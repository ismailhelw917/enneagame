import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, RefreshCcw } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { analytics } from '../services/analyticsService';
import { enneagramData } from '../data/enneagram';

const EnneagramChatbot = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Welcome to the Enneagaming Tactical Lab. I am your Strategic Psyche Analyst. I can help you identify your Enneagram type and translate it into a high-performance gaming profile. Shall we begin the assessment?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setIsThinking(true);
    analytics.trackEvent('chat_message_sent', { length: userMessage.length, text: userMessage });

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({ role: h.role as "user" | "model", parts: h.parts })),
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are the "Strategic Psyche Analyst" for Enneagaming. Your mission is to help gamers discover their Enneagram type and provide tactical gaming advice based on their personality.

Context Data (Enneagaming Theory):
${JSON.stringify(enneagramData.map(t => ({ id: t.id, name: t.name, role: t.gamingStyle.role, strengths: t.gamingStyle.strengths })), null, 2)}

Operational Guidelines:
1. Tone: Professional, tactical, analytical, yet empathetic. Use gaming terminology (IGL, macro, micro, tilt, meta, carry, support).
2. Strategy: Ask probing questions about their motivations (Why they play, what frustrates them, what feels rewarding).
3. One Step at a Time: Ask exactly ONE question per turn to keep the user focused.
4. Synthesis: Relate their answers back to the Enneagram types in the context data.
5. Goal: Narrow down their type (1-9). Once identified, provide a "Tactical Profile" summary.
6. If they already know their type, provide advanced gaming strategies for that type in various genres (MOBA, FPS, RPG).
7. Keep responses concise and scannable.`,
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        },
      });

      const botText = response.text || "Tactical error: Connection lost. Please re-establish link.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
      analytics.trackEvent('chat_response_received', { length: botText.length, text: botText });
    } catch (error) {
      console.error("Chatbot error:", error);
      analytics.trackError(error as Error, 'Chatbot');
      setMessages(prev => [...prev, { role: 'bot', text: `System disruption detected: ${error instanceof Error ? error.message : String(error)}. Please try again.` }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'bot', text: "Neural link reset. Ready for a new assessment. What's on your mind, Commander?" }]);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-6 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 sm:mb-6 px-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Bot className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">AI Test</h2>
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
        {isThinking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-2 sm:gap-3 items-center bg-cyan-500/5 border border-cyan-500/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-cyan-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-cyan-500 rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-cyan-500 rounded-full" />
              </div>
              <span className="text-[10px] sm:text-xs text-cyan-400 font-mono tracking-tighter uppercase">Processing Tactical Data...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-2 sm:mt-6 relative px-2 shrink-0">
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
      
      <p className="mt-2 sm:mt-4 text-[9px] sm:text-[10px] text-center text-gray-600 font-mono uppercase tracking-widest flex items-center justify-center gap-2 shrink-0">
        <Sparkles className="w-2.5 h-2.5 sm:w-3 h-3" /> Powered by Gemini Intelligence
      </p>
    </div>
  );
};

export default EnneagramChatbot;
